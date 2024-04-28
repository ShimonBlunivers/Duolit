interface User {
  id?: number;
  name?: string;
  password?: string;
  books?: Book[];
}

interface Author {
  name: string;
  states?: State[];
  artMovements?: ArtMovement[];
}

interface Book {
  id?: number;
  name: string;
  genre?: string;
  author?: string;
}

interface State {
  name: string;
}

interface ArtMovement {
  name: string;
}
