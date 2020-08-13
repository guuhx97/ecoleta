import { Request, Response } from "express";
import Knex from "../database/connection";

class PointController {
  async show(req: any, res: any) {
    const { id } = req.params;

    const point = await Knex("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ message: "Point not foud" });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.120:3333/uploads/${point.image}`,
    };

    const items = await Knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return res.json({ point: serializedPoint, items });
  }

  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

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

    const serializedPoints = points.map((item) => {
      return {
        id: item.id,
        name: item.name,
        email: item.email,
        whatsapp: item.whatsapp,
        latitude: item.latitude,
        longitude: item.longitude,
        city: item.city,
        uf: item.uf,
        image_url: `http://192.168.0.120:3333/uploads/${item.image}`,
      };
    });

    return response.json(serializedPoints);
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
      image: req.file.filename,
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

    const pointItems = items
      .split(",")
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
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
