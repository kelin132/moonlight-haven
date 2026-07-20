import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

try {
  await client.connect()
  const db = client.db()

  // How many users actually have web login credentials?
  const withMoonId = await db.collection("users").countDocuments({ moonId: { $exists: true, $ne: null } })
  const withWebPw = await db.collection("users").countDocuments({ webPassword: { $exists: true, $ne: null } })
  console.log("[v0] users with moonId:", withMoonId, "| with webPassword:", withWebPw)

  // Distinct roles
  const roles = await db.collection("users").distinct("role")
  console.log("[v0] distinct roles:", JSON.stringify(roles))
  const trueOwners = await db.collection("users").countDocuments({ isTrueOwner: true })
  console.log("[v0] isTrueOwner count:", trueOwners)

  // Sample a user that has web login set (redact secrets)
  const loginUser = await db.collection("users").findOne({ moonId: { $exists: true, $ne: null } })
  if (loginUser) {
    console.log("[v0] sample login user keys:", Object.keys(loginUser).join(", "))
    console.log("[v0] moonId type:", typeof loginUser.moonId, "| webPassword starts:", String(loginUser.webPassword || "").slice(0, 4))
    console.log("[v0] role:", loginUser.role, "| isTrueOwner:", loginUser.isTrueOwner, "| username:", loginUser.username)
  } else {
    console.log("[v0] NO user has moonId set")
  }

  // cards shape + sample values
  const card = await db.collection("cards").findOne({})
  console.log("\n[v0] cards sample:", JSON.stringify(card, null, 2)?.slice(0, 800))

  // legacyplayers shape
  const lp = await db.collection("legacyplayers").findOne({})
  console.log("\n[v0] legacyplayers sample:", JSON.stringify(lp, null, 2)?.slice(0, 600))

  // chatmessages shape
  const cm = await db.collection("chatmessages").findOne({})
  console.log("\n[v0] chatmessages sample:", JSON.stringify(cm, null, 2)?.slice(0, 600))

  // guild sample with values
  const g = await db.collection("guilds").findOne({})
  console.log("\n[v0] guild sample:", JSON.stringify(g, null, 2)?.slice(0, 700))
} catch (err) {
  console.log("[v0] Error:", err.message)
} finally {
  await client.close()
}
