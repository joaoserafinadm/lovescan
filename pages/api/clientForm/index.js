import { connect } from "@/utils/db";
import { ObjectId } from "bson";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { presentation_id } = req.query;

    if (!presentation_id)
      return res.status(400).json({ error: "Missing query parameters." });

    const { db } = await connect();

    const presentationExist = await db
      .collection("presentations")
      .findOne({ _id: new ObjectId(presentation_id) });
    if (!presentationExist)
      return res.status(400).json({ error: "Presentation does not exist." });

    return res.status(200).json({ presentationData: presentationExist });


    
  } else if (req.method === "PATCH") {
    const { presentation_id, presentationData } = req.body;

    // Validação mais robusta
    if (
      !presentation_id ||
      !presentationData ||
      typeof presentationData !== "object"
    ) {
      return res
        .status(400)
        .json({ error: "Missing or invalid body parameters." });
    }

    try {
      const { db } = await connect();

      // Verificar se a apresentação existe
      const presentationExist = await db
        .collection("presentations")
        .findOne({ _id: new ObjectId(presentation_id) });

      if (!presentationExist) {
        return res.status(404).json({ error: "Presentation not found." });
      }

      const statusExist = presentationExist.status || "pending";

      // Preparar dados para atualização (removendo campos sensíveis se necessário)
      const updateData = {
        ...presentationData,
        status: statusExist,
        updatedAt: new Date(), // Adicionar timestamp de atualização
      };

      // Remover campos que não devem ser atualizados
      delete updateData._id;
      delete updateData.createdAt;

      const response = await db
        .collection("presentations")
        .updateOne(
          { _id: new ObjectId(presentation_id) },
          { $set: updateData }
        );

      // Verificar se a atualização foi bem-sucedida
      if (response.matchedCount === 0) {
        return res.status(404).json({ error: "Presentation not found." });
      }

      if (response.modifiedCount === 0) {
        return res.status(200).json({ message: "No changes made." });
      }

      return res.status(200).json({
        message: "Presentation updated successfully",
        modifiedCount: response.modifiedCount,
      });
    } catch (error) {
      console.error("Error updating presentation:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}
