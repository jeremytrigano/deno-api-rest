import { Drash } from "https://deno.land/x/drash/mod.ts";

let heroes = [
  {
    "id": 1,
    "name": "Hulk",
    "alterego": "Bruce Banner",
  },
  {
    "id": 2,
    "name": "Captain Marvel",
    "alterego": "Carol Danvers",
  },
  {
    "id": 3,
    "name": "Nova",
    "alterego": "Sam Alexander",
  },
];

export class HeroList extends Drash.Http.Resource {
  static paths = ["/heroes"];

  public GET() {
    this.response.body = heroes;
    return this.response;
  }

  public POST() {
    const t = {
      id: Math.max.apply(
        Math,
        heroes.map(function (o) {
          return +o.id + 1;
        }),
      ),
      name: this.request.getBodyParam("name"),
      alterego: this.request.getBodyParam("alterego"),
    };
    heroes.push(t);

    this.response.body = t;
    return this.response;
  }
}

export class HeroElement extends Drash.Http.Resource {
  static paths = ["/heroes/:id"];

  public GET() {
    const URL_param = this.request.getPathParam("id");
    const t = heroes.find((t) => t.id == URL_param);
    if (!t) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Hero with id ${URL_param} not found`,
      );
    }
    this.response.body = t;
    return this.response;
  }

  public DELETE() {
    const URL_param = this.request.getPathParam("id");
    const t = heroes.find((t) => t.id == URL_param);
    if (!t) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Hero with id ${URL_param} not found`,
      );
    }
    heroes = heroes.filter((t) => t.id != URL_param);
    this.response.body = "DELETED OK";
    return this.response;
  }

  public PUT() {
    const URL_param = this.request.getPathParam("id");
    const t = heroes.find((t) => t.id == URL_param);
    if (!t) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Hero with id ${URL_param} not found`,
      );
    }
    t.alterego = this.request.getBodyParam("alterego");
    this.response.body = t;
    return this.response;
  }
}
