const bubbleSort = (array, property) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j][property] < array[j + 1][property]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
};

const fetchData = (name) => {
  Promise.all([
    fetch("https://api.jikan.moe/v4/anime?q=" + name),
    fetch("https://api.jikan.moe/v4/characters?q=" + name),
  ])
    .then((response) => {
      response.forEach((resp) => {
        if (resp.status !== 200) throw new Error("something went wrong");
      });

      return Promise.all(response.map((resp) => resp.json()));
    })
    .then((data) => {
      const list = [];
      data.forEach((el) => {
        list.push(el.data);
      });

      list.forEach((el) => {
        if (el[0].popularity !== undefined) {
          bubbleSort(el, "popularity");
          el.reverse();
          el.splice(5, el.length);
        } else {
          bubbleSort(el, "favorites");
          el.splice(5, el.length);
        }
      });

      return list;
    })
    .then((arr) => {
      console.log(arr);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchData("itadori");
