import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProdCatService} from '../prod-cat.service'
import { Product, ProductCategory, ProductsCategoryPage } from '../../../home/catalog.model'
import { first, catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-prod-cat',
  templateUrl: './edit-prod-cat.component.html',
  styleUrls: ['./edit-prod-cat.component.css']
})
export class EditProdCatComponent implements OnInit {

  @Input() current_id;
  edit_model : ProductCategory;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _catService: ProdCatService

  ) { }

  ngOnInit() {

    this.current_id  =  this.route.snapshot.params['id'];

    if (!this.current_id) {
      this.edit_model = new ProductCategory();
      this.buildForm(this.edit_model);
    }
    else {
      this._catService.getCategoryById(this.current_id).subscribe(
        product => {
          this.edit_model = product;
          this.buildForm(this.edit_model);
        }
      );
    }

  }

  buildForm(init_model : ProductCategory) {

    this.form = this.formBuilder.group({
      name: [init_model.name, Validators.required],
      description: [init_model.description, Validators.required],
  
    });
  
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.edit_model.name = this.f.name.value;
      this.edit_model.description = this.f.description.value;


      if (!this.edit_model._id) {
        this.createNew();
      }
      else {
        this.update();
      }
  }

  createNew(){
    this._catService.createCategory(this.edit_model)
    .pipe(first())
    .subscribe(
      prod => {
        this.edit_model = prod;
        this.router.navigate([`/editprodcat/${this.edit_model._id}`]);
      },
      error => {}
    );
  }

  update() {
    this._catService.updateCategory(this.edit_model)
    .pipe(first())
    .subscribe(
      prod => {
        this.router.navigate([`/editprodcat/${this.edit_model._id}`]); 
      },
      error => {}
    );
  }
}
