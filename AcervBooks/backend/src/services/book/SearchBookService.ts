import prismaClient from "../../prisma";

enum SearchByColumn {
    title = "title",
    genre = "genre",
    synops = "synops",
    author = "author",
    language = "language",
    publisher = "publisher",
    edition = "edition",
  }
  
  interface SearchBookRequest {
    term?: string;
    search_by?: keyof typeof SearchByColumn;
    year?: number;
    genre?: string;
    perPage: number;
    offset: number;
  }
  
  interface BookCondition {
    OR?: { [key: string]: { search: string } }[];
    year?: number;
    genre?: { contains: string };
  }
  
  class SearchBookService {
    private searchByToColumn: Record<keyof typeof SearchByColumn, string>;
  
    constructor() {
      this.searchByToColumn = {
        title: "title",
        genre: "genre",
        synops: "synops",
        author: "author",
        language: "language",
        publisher: "publisher",
        edition: "edition",
      };
    }
  
    private createSearchCondition(request: SearchBookRequest): BookCondition {
        const { term, search_by, year, genre } = request;
        const condition: BookCondition = {};
      
        if (term) {
          if (search_by && this.searchByToColumn[search_by]) {
            const columnName = this.searchByToColumn[search_by];
            condition.OR = [{ [columnName]: { search: term } }];
          } else {
            condition.OR = Object.keys(this.searchByToColumn).map((key) => ({
              [this.searchByToColumn[key]]: { search: term },
            }));
          }
        }
      
        if (year) {
          condition.year = year;
        }
      
        if (genre) {
          condition.genre = { contains: genre };
        }
      
        return condition;
      }
  
    private async getBooks(condition: BookCondition, perPage: number, offset: number) {
      const books = await prismaClient.book.findMany({
        where: condition,
        take: perPage,
        skip: offset,
        select: {
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
        },
      });
  
      return books;
    }
  
    async execute(request: SearchBookRequest) {
      const { term, search_by, year, genre, perPage, offset } = request;
  
      if (!term && !search_by && !genre && !year) {
        throw new Error("Invalid search! Provide data for search.");
      }
  
      const condition = this.createSearchCondition(request);
      const books = await this.getBooks(condition, perPage, offset);
  
      return books;
    }
  }

export { SearchBookService }