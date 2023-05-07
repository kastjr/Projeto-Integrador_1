import prismaClient from "../../prisma";

const searchByToColumn = {
    title: "title",
    genre: "genre",
    synops: "synops",
    author: "author",
    language: "language",
    publisher: "publisher",
    edition: "edition"
}

interface SearchBookRequest {
    term: string;
    search_by?: keyof typeof searchByToColumn;
    year?: number;
    genre?: string;
    perPage: number;
    offset: number;
}

class SearchBookService {

    private searchForAll(term: string) {
        return {
            OR: Object.keys(searchByToColumn).map((key) => ({
                [searchByToColumn[key]]: { search: term },
            })),
        };
    }

    private async getBooks(perPage: number, offset: number, condition: Object): Promise<Object> {
        const books = await prismaClient.book.findMany({
            where: condition, take: perPage, skip: offset, select: {
                id: true,
                title: true,
                image: true,
                synops: true,
                genre: true,
                year: true,
                author: true,
                volume: true,
                edition: true,
                language: true,
                publisher: true,
            }
        });
        return books;
    }

    async execute({ term, search_by, year, genre, perPage, offset }: SearchBookRequest) {


        let condition: Object;

        // Se não existir nenhum termo e filtro não foi aplicado.
        if (!term && !search_by && !genre && !year) {
            throw new Error("Invalid search! Provide data for search.");
        }

        // Verifica se nenhum filtro foi aplicado
        if (term && !search_by && !genre && !year) {
            // a condição padrão é buscar o termo em todas as colunas da tabela de livros.
            condition = this.searchForAll(term);
        }

        if (search_by) {
            if (!searchByToColumn[search_by]) {
                throw new Error(`Invalid search_by value: ${search_by}`);
            }
        }

        if (search_by && !year && !genre && !term) {
            throw new Error("Provide term to search!");
        }
        // Verifica se apenas o filtro buscar_por foi usado.
        else if (search_by && term && !year && !genre) {

            // A condição verifica se a coluna definida contém o valor passado na busca.
            condition = { [searchByToColumn[search_by]]: { search: term }};

            // Verifica se o apenas os campos buscar_por e ano foram passados
        } else if (search_by && year && term && !genre) {
            
            // Verifica se a coluna contém o valor passado no termo e se a linha contém o ano
            condition = {
                AND: [
                    { [searchByToColumn[search_by]]: { search: term } },
                    { year: year }
                ]
            }

            // Verifica se o apenas os campos buscar_por e gênero foram passados
        } else if (search_by && term && genre && !year) {

            // Verifica se a coluna defina contém o valor passado no termo e se a linha contém o gênero
            condition = {
                AND: [
                    { [searchByToColumn[search_by]]: { search: term } },
                    { genre: { search: genre } }
                ]
            }

        }
        // Verifica se os três filtros foram passados (buscar_por, ano e gênero)
        else if (search_by && year && genre && term) {
            // Verifica se a coluna defina contém o valor passado no termo e se a linha contém o ano e gênero
            condition = {
                AND: [
                    { [searchByToColumn[search_by]]: { search: term } },
                    { year: year },
                    { genre: { search: genre } }
                ]
            };

            // Verifica se apenas o filtro de gênero foi passado
        } else if (genre && !search_by && !year && !term) {
            // Verifica se o gênero corresponde
            condition = { genre: genre }

            // Verifica se o gênero foi passado e um termo
        } else if (genre && term && !search_by && !year) {
            condition = {
                AND: [
                    this.searchForAll(term),
                    { genre: genre }
                ]
            }

            // Verifica se apenas o gênero e o ano foram passados
        } else if (genre && year && !search_by && !term) {
            condition = {
                AND: [
                    { year: year },
                    { genre: genre }
                ]
            }

            // Verifica se o gênero, ano e termo foram passados.
        } else if (genre && year && term && !search_by) {
            condition = {
                AND: [
                    this.searchForAll(term),
                    { year: year },
                    { genre: genre }
                ]
            }

            // Verifica se apenas o ano foi passado
        } else if (year && !genre && !term && !search_by) {
            condition = { year: year }

        // Verifica se o ano e o termo foram passados
        } else if (year && term && !genre && !search_by) {
            condition = {
                AND: [
                    this.searchForAll(term),
                    { year: year }
                ]
            }
        }

        const books = await this.getBooks(perPage, offset, condition);
        return books;
    }
}

export { SearchBookService }