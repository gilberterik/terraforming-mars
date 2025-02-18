import {IGlobalEvent} from './IGlobalEvent';
import {GlobalEventName} from './GlobalEventName';
import {PartyName} from '../parties/PartyName';
import {Game} from '../../Game';
import {Resources} from '../../Resources';
import {Tags} from '../../cards/Tags';
import {Turmoil} from '../Turmoil';
import {CardRenderer} from '../../cards/render/CardRenderer';
import {Size} from '../../cards/render/Size';
import {played} from '../../cards/Options';

const RENDER_DATA = CardRenderer.builder((b) => {
  b.production((pb) => pb.energy(1)).slash().energy(2, {played}).influence({size: Size.SMALL});
});

export class ImprovedEnergyTemplates implements IGlobalEvent {
    public name = GlobalEventName.IMPROVED_ENERGY_TEMPLATES
    public description = 'Increase energy production 1 step per 2 power tags (no limit). Influence counts as power tags.';
    public revealedDelegate = PartyName.SCIENTISTS;
    public currentDelegate = PartyName.KELVINISTS;
    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        player.addProduction(Resources.ENERGY, Math.floor((player.getTagCount(Tags.ENERGY, 'raw') + turmoil.getPlayerInfluence(player)) / 2), {log: true, from: this.name});
      });
    }
    public renderData = RENDER_DATA;
}
