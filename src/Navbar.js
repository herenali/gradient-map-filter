import React from 'react';

function Navbar(props) {
  return (
    <nav>
			<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-wand"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 21l15 -15l-3 -3l-15 15l3 3" /><path d="M15 6l3 3" /><path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" /><path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" /></svg>
      <span>Gradient Map Filter</span>
			<ul>
				<li>
					<a href="https://herenali.github.io/projects/gradient-map/#using-the-app" target="_blank" rel="noreferrer">Tutorial</a>
				</li>
				<li>
					<a href="https://github.com/herenali/gradient-map-filter" target="_blank" rel="noreferrer">Source Code</a>
				</li>
			</ul>
    </nav>
  );
}

export default Navbar;