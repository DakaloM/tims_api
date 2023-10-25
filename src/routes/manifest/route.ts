import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndDriver, verifyTokenAndMarshal, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { manifestSchema } from "../../schema/manifest.schema";



const router = express.Router();

// Create trip manifest
router.post("/",verifyTokenAndMarshal || verifyTokenAndDriver,validate(manifestSchema),async (req: Request, res: Response) => {
 
    // create
    try {
        await db.manifest.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "Manifest added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new manifest"});
    }
})




// delete a manifest
router.delete("/:id",verifyTokenAndSuperUser,async (req: Request, res: Response) => {

    const id = req.params.id
    const manifest = await db.manifest.findUnique({
        where: {id: id}
    })

    if(!manifest) {
        return res.status(404).json({message: "manifest not found"})
    }

    // delete manifest
    try {
        await db.manifest.delete({
            where:{id: id}
        })
        return res.status(200).json({message: "Manifest deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete manifest"})
    }
})

// get a manifest
router.get("/:id",verifyToken , async (req: Request, res: Response) => {

    const id = req.params.id

    // get a manifest
    try {
        const manifest = await db.manifest.findUnique({
            where:{id: id}
        })
        if(!manifest) {
            return res.status(404).json({message: "manifest not found"})
        }
        return res.status(200).json(manifest)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get manifest"})
    }
})

// get all manifests for an association
router.get("/association/:associationId", verifyTokenAndAdmin, async (req: Request, res: Response) => {

    const id = req.params.associationId
    // check if the association exists
    const association = await db.association.findUnique({
        where: {id : id}
    })
    if(!association) {
        return res.status(404).json({message: "Association not found"})
    }
    // get  manifests
    try {
        const manifests = await db.manifest.findMany({
            where: {
                associationId: id
            }
        })
        return res.status(201).json(manifests)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get manifests"})
    }
})




export default router
