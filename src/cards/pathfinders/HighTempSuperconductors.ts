import {IProjectCard} from '../IProjectCard';
import {Player} from '../../Player';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tags} from '../Tags';
import {CardRequirements} from '../CardRequirements';
import {Resources} from '../../Resources';
import {PartyName} from '../../turmoil/parties/PartyName';
import {played} from '../Options';

export class HighTempSuperconductors extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.HIGH_TEMP_SUPERCONDUCTORS,
      cost: 10,
      tags: [Tags.ENERGY, Tags.SCIENCE],

      requirements: CardRequirements.builder((b) => b.party(PartyName.KELVINISTS)),

      metadata: {
        cardNumber: 'PfTMP',
        renderData: CardRenderer.builder((b) => {
          b.effect('When playing a power card, THE STANDARD PROJECT POWER PLANT, OR A KELVINISTS PROJECT, pay 3M€ less.', (eb) => {
            // TODO(chosta): energy(, {played}) needs to be power() [same for space()]
            eb.energy(1, {played}).asterix().slash().text('Kelvinists').startEffect.megacredits(-3);
          }).br;
          b.production((pb) => pb.energy(2));
        }),
        description: 'Requires Kelvinists are ruling or you have 2 delegates there. Increase your energy production 2 steps.',
      },
    });
  }

  public getCardDiscount(_player: Player, card: IProjectCard) {
    if (card.tags.includes(Tags.ENERGY) || card.requirements?.hasParty(PartyName.KELVINISTS)) {
      return 3;
    }
    return 0;
  }

  public play(player: Player) {
    player.addProduction(Resources.ENERGY, 2);
    return undefined;
  }
}
