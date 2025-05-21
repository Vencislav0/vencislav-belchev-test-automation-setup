import logger from '../logger'
import { BaseElement } from './BaseElement'

export class Label extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }
}
