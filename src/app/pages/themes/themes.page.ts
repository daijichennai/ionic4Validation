import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
@Component({
  selector: 'app-themes',
  templateUrl: './themes.page.html',
  styleUrls: ['./themes.page.scss'],
})
export class ThemesPage implements OnInit {
public themes = {
    autumn: {
      primary: '#F78154',
      secondary: '#4D9078',
      tertiary: '#B4436C',
      light: '#FDE8DF',
      medium: '#FCD0A2',
      dark: '#B89876'
    },
    night: {
      primary: '#8CBA80',
      secondary: '#FCFF6C',
      tertiary: '#FE5F55',
      medium: '#BCC2C7',
      dark: '#F7F7FF',
      light: '#495867'
    },
    neon: {
      primary: '#39BFBD',
      secondary: '#4CE0B3',
      tertiary: '#FF5E79',
      light: '#F4EDF2',
      medium: '#B682A5',
      dark: '#34162A'
    }
  };
  constructor(private themeService: ThemeService) { }

  ngOnInit() {
  }

  // changeTheme(name) {
  //   this.themeService.setTheme(this.themes[name]);
  // }


  radioGroupChange(event) {
    console.log('radioGroupChange', event.detail.value);
    this.themeService.setTheme(this.themes[event.detail.value]);
    // this.selectedRadioGroup = event.detail;
  }
}
