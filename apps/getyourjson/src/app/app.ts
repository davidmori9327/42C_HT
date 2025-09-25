import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadFiles } from './store/file.actions';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected title = 'getyourjson';

  constructor(private store: Store) {
    this.store.dispatch(loadFiles());
  }
}
