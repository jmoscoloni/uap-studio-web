interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

const redirects: Redirect[] = [
  // {
  //   source: '/',
  //   destination: '/test',
  //   permanent: true
  // }
];

export default redirects;
