const AppConfig:any = {
  site: {
    name: 'Meneventi',
    description: 'A maior e melhor resenha de poker do mundo!',
    baseURL: 'https://meneventi.com',
  },
  timer: [
    { round: 1, small: 100, big: 200, duration: 15, break: false },
    { round: 2, small: 200, big: 400, duration: 15, break: false },
    { round: 3, small: 300, big: 600, duration: 15, break: false },
    { round: 4, small: 400, big: 800, duration: 15, break: false },
    { round: 5, small: 500, big: 1000, duration: 15, break: false },
    { round: 6, small: 1000, big: 2000, duration: 15, break: false },
    { round: 7, small: 2000, big: 4000, duration: 15, break: false },
    { round: 8, small: null, big: null, duration: 15, break: true },
    { round: 9, small: 3000, big: 6000, duration: 12, break: false },
    { round: 10, small: 4000, big: 8000, duration: 12, break: false },
    { round: 11, small: 5000, big: 10000, duration: 12, break: false },
    { round: 12, small: 10000, big: 20000, duration: 12, break: false },
    { round: 13, small: 15000, big: 30000, duration: 10, break: false },
    { round: 14, small: 20000, big: 40000, duration: 10, break: false },
    { round: 15, small: 25000, big: 50000, duration: 10, break: false },
    { round: 16, small: 50000, big: 100000, duration: 10, break: false },
    { round: 17, small: 100000, big: 200000, duration: 10, break: false },
    { round: 18, small: 200000, big: 400000, duration: 10, break: false },
  ]
};

export default AppConfig;