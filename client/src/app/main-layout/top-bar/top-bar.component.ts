import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  languages: string[] = ['pl', 'en', 'de']
  activeLanguage: string = this.languages[0]

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    const languageInStorage: string | null = localStorage.getItem("active_language")
    if (!languageInStorage || !this.languages.includes(languageInStorage))
      return localStorage.setItem("active_language", this.activeLanguage)

    this.activeLanguage = languageInStorage as string
    this.translate.use(this.activeLanguage)
  }

  changeLanguage() : void {
    localStorage.setItem("active_language", this.activeLanguage)
    this.translate.use(this.activeLanguage)
  }
}
