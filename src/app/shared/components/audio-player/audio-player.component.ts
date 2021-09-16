import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  @Input()
  src: string | undefined;
  @ViewChild(MatSlider)
  slider!: MatSlider;
  audio!: HTMLAudioElement;
  playbackBlocked: boolean = true;

  ngOnInit() {
    this.audio = new Audio(this.src);
    this.audio.ontimeupdate = () => {
      this.slider.value = this.audio.currentTime;
    };
    this.audio.load();
    this.onAudioLoad();
  }

  changePlayback() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  onAudioLoad() {
    this.playbackBlocked = false;
  }

  onPlaybackChangeButtonClick() {
    this.changePlayback();
  }

  onSliderDrag() {
    this.audio.currentTime = this.slider.value;
  }

  get playing() {
    return !this.audio.paused;
  }
}
