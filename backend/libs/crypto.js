import bcrypt from "bcrypt"

async function hash(password) {
    return await bcrypt.hash(password, 3)
}


async function compareHashes(password, hash) {
    return await bcrypt.compare(password, hash)
}

export { hash, compareHashes }