import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.scss']
})
export class AddPostDialog implements OnInit {
  postForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddPostDialog>
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(250)]]
    });
  }

  save() {
    if (this.postForm.valid) {
      const formValue = this.postForm.value;
      this.dialogRef.close(formValue);
    }
  }
}
