import Knex from "../database/connection";

class PointController {
  async show(req: any, res: any) {
    const { id } = req.params;

    const point = await Knex("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ message: "Point not foud" });
    }

    const items = await Knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return res.json({ point, items });
  }

  async index(req: any, res: any) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await Knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    return res.json(points);
  }

  async store(req: any, res: any) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const trx = await Knex.transaction();

    const point = {
      image:
        "https://images.unsplash.com/photo-1580913428023-02c695666d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("point_items").insert(pointItems);

    await trx.commit();

    return res.json({
      id: point_id,
      ...point,
    });
  }
}
export default new PointController();
