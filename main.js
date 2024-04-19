import Pokemon from "./pokemon.js";
import {random, generateLog, countBtn} from "./utils.js";


class Game {
	getPokemons = async () => {
			const responce = await fetch('https://reactmarathon-api.netlify.app/api/pokemons');
			const body = await responce.json();
			return body;
	}
	start = async () => {
		const pokemons = await this.getPokemons();
		console.log(pokemons);
		const pikachu = pokemons.find(item => item.name === 'Pikachu');
		const player1 = new Pokemon ({
			...pikachu,
			selectors: 'player1',
		});
		
		
		const player2 = new Pokemon ({
			selectors: 'player2',
			name: 'Charmander',
			type: 'fire',
			hp: 282,
		});
		
		const $control = document.querySelector('.control');
		
		player1.attacks.forEach(item => {
			console.log(item);
			const $btn = document.createElement('button');
			$btn.classList.add('button');
			$btn.innerText = item.name;
			const btnCount = countBtn(item.maxCount, $btn);
			$btn.addEventListener('click', () => {
				console.log('Click button ', $btn.innerText);
				btnCount();
			})
			$control.appendChild($btn);
		});
	}
}

const game = new Game();
game.start();

