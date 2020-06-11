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
  const res = await fetch(`${apiUrl}/suggest/${term}}`)
  const data: {} = await res.json()
  showData()
};

const showData = (data: {}) =>{
  
}


form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  const searchTerm: string = search.value.trim();
  if (!searchTerm) {
    alert('Please type some text ...');
  }
  searchSongs(searchTerm);
});
