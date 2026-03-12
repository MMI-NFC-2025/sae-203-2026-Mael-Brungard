import {
    getArtistsByDate,
    getScenesByName,
    getArtistsByName,
    getOneArtist,
    getOneScene,
    getArtistsByScene,
    getArtistsBySceneName,
    getArtistsByGenre,
    getImageUrl,
    formatDate,
    formatDateNoHour,
    fortmatDateHour
} from './backend.mjs';

let testArtistId = "";
let testSceneId = "";
let testSceneName = "Scène Principale";

console.log("=== DÉBUT DES TESTS ===\n");

try {
    const records = await getArtistsByDate();
    console.log("getArtistsByDate :", records.length, "artistes trouvés");
    if (records.length > 0) testArtistId = records[0].id;
} catch (e) {
    console.error("Erreur dans getArtistsByDate :", e.message);
}

try {
    const records = await getScenesByName();
    console.log("✅ getScenesByName :", records.length, "scènes trouvées");
    if (records.length > 0) {
        testSceneId = records[0].id;
        testSceneName = records[0].name || records[0].nom;
    }
} catch (e) {
    console.error("❌ Erreur dans getScenesByName :", e.message);
}

try {
    const records = await getArtistsByName();
    console.log("✅ getArtistsByName :", records.length, "artistes trouvés");
} catch (e) {
    console.error("❌ Erreur dans getArtistsByName :", e.message);
}

try {
    if (testArtistId) {
        const record = await getOneArtist(testArtistId);
        console.log("✅ getOneArtist : trouvé", record.name || record.nom);
    } else {
        console.warn("⚠️ getOneArtist : test sauté (aucun ID d'artiste)");
    }
} catch (e) {
    console.error("❌ Erreur dans getOneArtist :", e.message);
}

try {
    if (testSceneId) {
        const record = await getOneScene(testSceneId);
        console.log("✅ getOneScene : trouvée", record.name || record.nom);
    } else {
        console.warn("⚠️ getOneScene : test sauté (aucun ID de scène)");
    }
} catch (e) {
    console.error("❌ Erreur dans getOneScene :", e.message);
}

try {
    if (testSceneId) {
        const records = await getArtistsByScene(testSceneId);
        console.log(`✅ getArtistsByScene (${testSceneId}) :`, records.length, "artistes");
    }
} catch (e) {
    console.error("❌ Erreur dans getArtistsByScene :", e.message);
}

try {
    if (testSceneName) {
        const records = await getArtistsBySceneName(testSceneName);
        console.log(`✅ getArtistsBySceneName (${testSceneName}) :`, records.length, "artistes");
    }
} catch (e) {
    console.error("❌ Erreur dans getArtistsBySceneName :", e.message);
}
try {
    const records = await getArtistsByGenre('Tout');
    console.log("✅ getArtistsByGenre (Tout) :", records.length, "artistes");
} catch (e) {
    console.error("❌ Erreur dans getArtistsByGenre :", e.message);
}

try {
    const artists = await getArtistsByDate();
    if (artists.length > 0) {
        const a = artists[0];
        console.log("\n--- Tests utilitaires sur :", a.name || a.nom, "---");

        const url = await getImageUrl(a, a.image, '100x100');
        console.log("🔗 URL Image :", url);
        console.log("📅 formatDate :", formatDate(a.date));
        console.log("📅 formatDateNoHour :", formatDateNoHour(a.date));
        console.log("⏰ fortmatDateHour :", fortmatDateHour(a.date));
    }
} catch (e) {
    console.error("❌ Erreur dans les utilitaires :", e.message);
}

console.log("\n=== FIN DES TESTS ===");