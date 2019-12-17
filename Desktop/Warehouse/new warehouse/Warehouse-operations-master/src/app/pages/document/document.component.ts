import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "src/app/services/order.service";
import { ItemList } from "src/app/models/ItemList";
import { ArticleList } from "src/app/models/ArticleList";

@Component({
  selector: "app-document",
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.css"]
})
export class DocumentComponent implements OnInit {
  docId: number;
  docList: ItemList;
  articleList: ArticleList;
  formData: any = {};
  constructor(
    private route: ActivatedRoute,
    private docService: OrderService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.docId = +params.get("id");
      console.log(this.docId);
    });
    this.docService.getDocumentItems(this.docId).subscribe(data => {
      this.docList = data;
    });
    this.docService.getArticles().subscribe(data => {
      this.articleList = data;
    });
  }
  onSubmit() {
    this.docService
      .postArticle(this.formData, this.docId)
      .subscribe(res => this.docList.results.push(res));
  }
}
