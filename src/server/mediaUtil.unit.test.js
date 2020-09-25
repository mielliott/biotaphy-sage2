
const mediaUtil = require("./mediaUtil")

test("Build a path to a SAGE2 resource", () => {
    let path = mediaUtil.getMediaPath("wombat", "species", "wombat.txt")
    expect(path).toBe("wombat_species_wombat.txt")
})
