export const Colors = [
  {
    color: "black",
  },
  {
    color: "red",
  },
  {
    color: "pink",
  },
  {
    color: "blue",
  },
  {
    color: "yellow",
  },
];
export const Size = [
  {
    size: "S",
    width: 2
  },
  {
    size: "M",
    width: 4
  },
  {
    size: "L",
    width: 8
  },
];

export const Dash = [
  {
    dash:'Solid'
  },
  {
    dash:'Dash'
  }
]

export interface LineSet {
  idColor: number;
  idSize: number;
  idDash:number
}
