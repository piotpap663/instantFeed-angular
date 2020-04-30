import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

import { ApiCallService } from '../api-call.service';
import { IAppState } from '../app.module';

@Component({
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  userId;
  file = null;
  errors = [];
  text = '';
  file64: ArrayBuffer | string = '';
  uploaded = false;
  uploadedText = 'Thank you';
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private apiCall: ApiCallService,
  ) { }

  ngOnInit(): void {
    this.ngRedux.select(['auth', 'id']).subscribe(id => {
      this.userId = id;
    });
  }

  handleErrors(errors) {
    this.errors = errors;
  }

  fileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    const data = {
      authorId: this.userId,
      image: this.file64,
      text: this.text,
    };

    this.apiCall.addPost(data)
      .then((response: any) => {
        if (response.info) {
          alert(response.info);
        } else {
          this.uploaded = true;
          this.file = null;
          this.errors = [];
          this.text = '';
          this.file64 = '';
        }
      })
      .catch((errors) => {
        this.errors = errors;
      });
  }

  onChange(e) {
    this.file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.file64 = reader.result;

    }, false);
    reader.readAsDataURL(e.target.files[0]);
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.fileUpload(this.file);
  }

  handleText(e) {
    this.text = e.target.value;
  }

}
