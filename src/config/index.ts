const AppConfig:any = {
  site: {
    name: 'Meneventi',
    description: 'A maior e melhor resenha de poker do mundo!',
    baseURL: 'https://meneventi.com',
  },
  timer: [
    { small: 100, big: 200, duration: 15, break: false },
    { small: 200, big: 400, duration: 15, break: false },
    { small: 300, big: 600, duration: 15, break: false },
    { small: 400, big: 800, duration: 15, break: false },
    { small: 500, big: 1000, duration: 15, break: false },
    { small: 1000, big: 2000, duration: 15, break: false },
    { small: 2000, big: 4000, duration: 15, break: false },
    { small: null, big: null, duration: 15, break: true },
    { small: 3000, big: 6000, duration: 12, break: false },
    { small: 4000, big: 8000, duration: 12, break: false },
    { small: 5000, big: 10000, duration: 12, break: false },
    { small: 10000, big: 20000, duration: 12, break: false },
    { small: 15000, big: 30000, duration: 10, break: false },
    { small: 20000, big: 40000, duration: 10, break: false },
    { small: 25000, big: 50000, duration: 10, break: false },
    { small: 50000, big: 100000, duration: 10, break: false },
    { small: 100000, big: 200000, duration: 10, break: false },
    { small: 200000, big: 400000, duration: 10, break: false },
  ]
};

export default AppConfig;