import { createSimpleFunctional } from '../../utils/helpers';

export const GCardText = createSimpleFunctional('g-card__text', 'div', 'GCardText');
export const GCardActions = createSimpleFunctional('g-card__actions', 'div', 'GCardActions');
export const GCardSubtitle = createSimpleFunctional('g-card__subtitle', 'div', 'GCardSubtitle');

export default {
  GCardActions, GCardText, GCardSubtitle
}
