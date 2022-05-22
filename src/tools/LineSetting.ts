export const Colors = [
  {
    color: "rgb(29,29,29)",
  },
  {
    color: "rgb(255,33,51",
  },
  {
    color: "pink",
  },
  {
    color: "rgb(28,126,214)",
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
