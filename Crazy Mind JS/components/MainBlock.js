"use strict";
import './MainBlock.css';

let mainBlock = `<div class="mainBlock">
<img src="./images/are_you.png">
<input onclick={location.hash='Game'} value="Start Game" type="button" class="mainBlock_button" style="color: red">
<input onclick={location.hash='Rules'} value='Rules' type="button" class="mainBlock_button" style="color: blue">
<input onclick={location.hash='Records'} value='Records' type="button" class="mainBlock_button" style="color: green">
</div>`;
export {mainBlock};