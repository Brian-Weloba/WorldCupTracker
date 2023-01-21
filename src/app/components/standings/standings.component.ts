import { Component, OnInit } from '@angular/core';
import { StandingService } from '../../services/standing.service';
import { Table } from '../../classes/table';
import { Live } from '../../classes/live';
import { LiveScoreService } from '../../services/live-score.service';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})

export class StandingsComponent implements OnInit {
  tables: Table[] = [];
  groups: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  live: Live | undefined;
  minutes: any;
  match_time: any;
  loading = false;
  err = false;
  id = "tsparticles";

  ngOnInit(): void {
    this.fetchStandings();
    this.fetchLive();
    if (this.live?.match.time.period != null) {
      window.setInterval(() => {
        this.fetchLive();
        console.log('fetch');
      }, 10000);
    }
  }

  constructor(
    private standingsService: StandingService,
    private liveScore: LiveScoreService
  ) {}

  ngOnDestroy(): void {
    // clearInterval(intervalId)
  }

  async fetchLive() {
    await this.liveScore.getLiveScore().then(
      () => {
        this.live = this.liveScore.live;
        this.match_time = new Date(
          this.live?.match.time?.start * 1000
        ).toLocaleString();
        if (this.live?.match.status.description === '1st half') {
          let time = this.live?.time - this.live?.match.time?.start;
          this.minutes = Math.floor(time / 60);
          if (this.minutes > 45) {
            this.minutes = '45+' + (this.minutes - 45);
          }
        } else if (this.live?.match.status.description === '2nd half') {
          let time = this.live?.time - this.live?.match.time?.period;
          this.minutes = Math.floor(time / 60) + 45;
          if (this.minutes > 90) {
            this.minutes = '90+' + (this.minutes - 90);
          }
        } else if (this.live?.match.status.description === 'Halftime') {
          this.minutes = 'HT';
        } else if (this.live?.match.status.description === 'Ended') {
          this.minutes = 'FT';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async fetchStandings() {
    this.loading = true;
    this.err = false;
    await this.standingsService.fetchTables().then(
      () => {
        this.tables = this.standingsService.tables;
        for (let table of this.tables) {
          table.teams.sort((a, b) => b.pts - a.pts);
        }
      },
      (error) => {
        console.log(error);
        this.err = true;
      }
    );
    this.loading = false;
  }

  particlesOptions = {
    background: {
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: ClickMode.push,
            },
            onHover: {
                enable: true,
                mode: HoverMode.repulse,
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: ["#74ACDF", "#FFFFFF", "#F6B40E"],
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        collisions: {
            enable: true,
        },
        move: {
            direction: MoveDirection.none,
            enable: true,
            outModes: {
                default: OutMode.bounce,
            },
            random: false,
            speed: 6,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 5 },
        },
    },
    detectRetina: true,
};

particlesLoaded(container: Container): void {
    console.log(container);
}

async particlesInit(engine: Engine): Promise<void> {
    console.log(engine);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}
}
