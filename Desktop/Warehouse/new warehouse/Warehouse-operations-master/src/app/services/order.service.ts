import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OrderList } from "../models/OrderList";
import { ItemList } from "../models/ItemList";
import { ArticleList } from "../models/ArticleList";
import { Item } from "../models/Item";

const BASE_URL = "http://localhost:3000/api/documents";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(query: any) {
    return this.http.get<OrderList>(
      BASE_URL +
        `?page=${query.current}&pageSize=${query.size}&sortDirection=${query.sortDirection}&sort=${query.sort}`
    );
  }
  getDocumentItems(id: number) {
    // http://localhost:3000/api/documents/:documentId/items
    return this.http.get<ItemList>(BASE_URL + "/" + id + "/items");
  }
  getArticles() {
    return this.http.get<ArticleList>("http://localhost:3000/api/articles");
  }
  postArticle(article: any, id: number) {
    return this.http.post<Item>(BASE_URL + "/" + id + "/items", article);
  }
}
