export class Recipe {
  public id: string;
  public name: string;
  public description: string;
  public price: string;
  public image: string;

  constructor(
    id: string,
    name: string,
    desc: string,
    price: string,
    image: string,
  ) {
    this.id = id,
      this.name = name;
    this.description = desc;
    this.price = price;
    this.image = image;
  }
}
