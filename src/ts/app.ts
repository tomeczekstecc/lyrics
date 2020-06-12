const apiUrl: string = 'https://api.lyrics.ovh';

const form = document.getElementById('form') as HTMLFormElement;
const search = document.getElementById('search') as HTMLFormElement;
const result = document.getElementById('result') as HTMLFormElement;
const more = document.getElementById('more') as HTMLFormElement;

// const searchSongs = (term: string) => {
//   fetch(`${apiUrl}/suggest/${term}}`).then((res) =>
//     res.json().then((data) => console.log(data))
//   );
// };

// const searchSongs = async (term: string) => {
//   const data: [] = await (await fetch(`${apiUrl}/suggest/${term}}`)).json()
//   console.log(data)
// };
const searchSongs = async (term: string) => {
  const res = await fetch(`${apiUrl}/suggest/${term}}`);
  const data: {} = await res.json();
  showData(data);
};

const showData = (data: any) => {
  // let output = '';

  // data.data.forEach((song: any) => {
  //   output += `
  //   <li>
  //     <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //     <button class="btn" data-artist ="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  //   </li>
  //   `;
  // });

  // result.innerHTML = `
  //     <ul class="songs">
  //       ${output}
  //     </ul>
  // `

  result.innerHTML = `
      <ul class = 'songs'>
          ${data.data
            .map(
              (song: any) =>
                `
            <li>
              <span><strong>${song.artist.name}</strong> - ${song.title}</span>
              <button class="btn" data-artist ="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
            </li>
              `
            )
            .join('')}
      </ul>
  `;

  if (data.prev || data.next) {

    more.innerHTML = `
          ${
            data.prev
              ? `<button class="btn" onClick = "getMoreSongs('${data.prev}')">Prev</button>`
              : ``
          }

          ${
            data.next
              ? `<button class="btn" onClick = "getMoreSongs('${data.next}')">Next</button>`
              : ``
          }
      `;
  } else {
    more.innerHTML = '';
  }
};

async function getLyrics(artist: string, songTitle: string) {
  const res = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  result.innerHTML = `
  <h2><strong>${artist} - </strong> ${songTitle}</h2>
  <span>${lyrics}</span>
  `
more.innerHTML = ''
  ;
}

async function getMoreSongs(url: string) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  const searchTerm: string = search.value.trim();
  if (!searchTerm) {
    alert('Please type some text ...');
  }
  searchSongs(searchTerm);
});

result.addEventListener('click', (e: Event | any) => {
  const clickedEl = e.target;
  if (clickedEl.tagName == 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
});
