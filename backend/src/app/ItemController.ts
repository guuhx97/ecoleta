import knex from "../database/connection";

class ItemController {
  async index(request: any, response: any) {
    const items = await knex("items").select("*");
    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.0.120:3333/uploads/${item.image}`,
      };
    });
    return response.json(serializedItems);
  }
}

export default new ItemController();
