import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    http.get<ListResponseModel<Product>>('http://localhost:8070/api/product/getall')
    .subscribe(res=>{
      // this.products = res.data;
    });
  }

  ngOnInit(): void {
    let categoryName : any = this.route.snapshot.paramMap.get('categoryName');

    if (categoryName == "all")
    {
      this.showAll();
    }
    else
    {
      this.filterProducts(categoryName?.trim());
    }
  }

  showAll(): void
  {
    this.http.get<ListResponseModel<Product>>("http://localhost:8070/api/product/getall")
    .subscribe(res => {
      this.products = res.data;
    });
  }

  filterProducts(categoryName : any): void {
    this.http.get<ListResponseModel<Product>>("http://localhost:8070/api/product/getallbycategory?categoryName=" + categoryName)
      .subscribe(res => {
        this.products = res.data;
      })
    }

}
