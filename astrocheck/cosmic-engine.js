/**
 * Celestial Harmony Engine v3.0
 * Dasa Koota Matching System - Accurate Implementation
 * Based on Traditional Vedic Astrology
 */
(function(w) {
    'use strict';

    // Rashi (Zodiac Signs) - 12 signs
    const RASHI = [
        'Mesha', 'Vrishaba', 'Mithuna', 'Karka', 'Simha', 'Kanya',
        'Tula', 'Vrischika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
    ];

    // Nakshatra (Lunar Mansions) - 27 stars
    const NAKSHATRA = [
        'Aswini', 'Bharani', 'Krittika', 'Rohini', 'Mrigasira', 'Arudra',
        'Punarvasu', 'Pushyami', 'Asleesha', 'Makha', 'Poorva Phalguni', 
        'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Visakha',
        'Anuuraadha', 'Jyeshta', 'Moola', 'Poorvashadha', 'Uttarashadha',
        'Sravana', 'Dhanistha', 'Satabhishtha', 'Poorva Bhaadra', 
        'Uttara Bhaadra', 'Revati'
    ];

    // Zodiac Symbols
    const SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

    // Rashi to Nakshatra mapping (which nakshatras belong to which rashi)
    // Each rashi covers 2.25 nakshatras (each nakshatra has 4 padas, rashi has 9 padas)
    const RASHI_NAKSHATRA_MAP = {
        1: [1, 2, 3],      // Mesha: Aswini (full), Bharani (full), Krittika (pada 1)
        2: [3, 4, 5],      // Vrishaba: Krittika (padas 2-4), Rohini (full), Mrigasira (padas 1-2)
        3: [5, 6, 7],      // Mithuna: Mrigasira (padas 3-4), Arudra (full), Punarvasu (padas 1-3)
        4: [7, 8, 9],      // Karka: Punarvasu (pada 4), Pushyami (full), Asleesha (full)
        5: [10, 11, 12],   // Simha: Makha (full), Poorva Phalguni (full), Uttara Phalguni (pada 1)
        6: [12, 13, 14],   // Kanya: Uttara Phalguni (padas 2-4), Hasta (full), Chitra (padas 1-2)
        7: [14, 15, 16],   // Tula: Chitra (padas 3-4), Swati (full), Visakha (padas 1-3)
        8: [16, 17, 18],   // Vrischika: Visakha (pada 4), Anuuraadha (full), Jyeshta (full)
        9: [19, 20, 21],   // Dhanu: Moola (full), Poorvashadha (full), Uttarashadha (pada 1)
        10: [21, 22, 23],  // Makara: Uttarashadha (padas 2-4), Sravana (full), Dhanistha (padas 1-2)
        11: [23, 24, 25],  // Kumbha: Dhanistha (padas 3-4), Satabhishtha (full), Poorva Bhaadra (padas 1-3)
        12: [25, 26, 27]   // Meena: Poorva Bhaadra (pada 4), Uttara Bhaadra (full), Revati (full)
    };

    // Nakshatra to primary Rashi (main rashi for each nakshatra)
    const NAKSHATRA_RASHI = [
        1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12
    ];

    // Gana for each Nakshatra: 1=Deva, 2=Nara/Manushya, 3=Rakshasa
    const GANA = [1, 2, 3, 2, 1, 2, 1, 1, 3, 3, 2, 2, 1, 3, 1, 3, 1, 3, 3, 2, 2, 1, 3, 3, 2, 2, 1];

    // Yoni (Animal) for each Nakshatra
    const YONI_ANIMAL = [
        'Horse', 'Elephant', 'Goat', 'Cobra', 'Snake', 'Dog', 'Cat', 'Goat', 'Cat',
        'Rat', 'Rat', 'Bull', 'Buffalo', 'Tiger', 'Buffalo', 'Tiger', 'Deer', 'Deer',
        'Dog', 'Monkey', 'Mongoose', 'Monkey', 'Lion', 'Horse', 'Lion', 'Cow', 'Elephant'
    ];

    // Yoni Sex for each Nakshatra: M=Male, F=Female
    const YONI_SEX = [
        'M', 'M', 'F', 'M', 'F', 'M', 'M', 'M', 'M', 'M', 'F', 'M', 'F', 'M', 'M',
        'F', 'F', 'M', 'F', 'M', 'M', 'F', 'F', 'F', 'M', 'F', 'F'
    ];

    // Enemy animal pairs
    const ENEMY_ANIMALS = [
        ['Cow', 'Tiger'], ['Elephant', 'Lion'], ['Horse', 'Buffalo'],
        ['Dog', 'Deer'], ['Rat', 'Cat'], ['Goat', 'Monkey'], ['Snake', 'Mongoose']
    ];

    // Prey relationships (predator-prey)
    const PREY_PAIRS = [
        ['Tiger', 'Deer'], ['Tiger', 'Goat'], ['Tiger', 'Cow'], ['Tiger', 'Buffalo'],
        ['Lion', 'Deer'], ['Lion', 'Goat'], ['Lion', 'Cow'], ['Lion', 'Buffalo'],
        ['Snake', 'Rat']
    ];

    // Rajju (Body Part) for each Nakshatra
    const RAJJU = [
        'Paada', 'Vooru', 'Udara', 'Kantha', 'Sira', 'Kantha', 'Udara', 'Vooru', 'Paada',
        'Paada', 'Vooru', 'Udara', 'Kantha', 'Sira', 'Kantha', 'Udara', 'Vooru', 'Paada',
        'Paada', 'Vooru', 'Udara', 'Kantha', 'Sira', 'Kantha', 'Udara', 'Vooru', 'Paada'
    ];

    // Vedha (Affliction) pairs - these nakshatra pairs cause vedha
    const VEDHA_PAIRS = [
        [1, 18], [2, 17], [3, 16], [4, 15], [6, 22], [7, 21], [8, 20], [9, 19],
        [10, 27], [11, 26], [12, 25], [13, 24]
    ];

    // Additional Vedha for Mrigasira-Chitra-Dhanistha triangle
    const VEDHA_TRIANGLE = [
        [5, 14], [5, 23], [14, 23]
    ];

    // Rashi Lords: Ma=Mars, Ve=Venus, Me=Mercury, Mo=Moon, Su=Sun, Ju=Jupiter, Sa=Saturn
    const RASHI_LORDS = ['Ma', 'Ve', 'Me', 'Mo', 'Su', 'Me', 'Ve', 'Ma', 'Ju', 'Sa', 'Sa', 'Ju'];

    // Planetary Friendship table
    const FRIENDS = {
        'Su': ['Mo', 'Ma', 'Ju'],
        'Mo': ['Su', 'Me'],
        'Ma': ['Su', 'Mo', 'Ju'],
        'Me': ['Su', 'Ve'],
        'Ju': ['Su', 'Mo', 'Ma'],
        'Ve': ['Me', 'Sa'],
        'Sa': ['Me', 'Ve']
    };

    const ENEMIES = {
        'Su': ['Sa', 'Ve'],
        'Mo': [],
        'Ma': ['Me'],
        'Me': ['Mo'],
        'Ju': ['Me', 'Ve'],
        'Ve': ['Su', 'Mo'],
        'Sa': ['Su', 'Mo', 'Ma']
    };

    // Vasya (Attraction) pairs - Rashi to its Vasya Rashis
    const VASYA = {
        1: [5, 8],     // Mesha: Simha, Vrischika
        2: [4, 7],     // Vrishaba: Karka, Tula
        3: [6],        // Mithuna: Kanya
        4: [8, 9],     // Karka: Vrischika, Dhanu
        5: [7],        // Simha: Tula
        6: [3, 12],    // Kanya: Mithuna, Meena
        7: [6, 10],    // Tula: Kanya, Makara
        8: [4, 9],     // Vrischika: Karka, Dhanu
        9: [12],       // Dhanu: Meena
        10: [1, 11],   // Makara: Mesha, Kumbha
        11: [1],       // Kumbha: Mesha
        12: [10]       // Meena: Makara
    };

    // ============ CALCULATION FUNCTIONS ============

    /**
     * 1. DINA KOOTA (3 points max)
     * Measures daily compatibility and health
     */
    function calculateDina(girlNakshatra, boyNakshatra) {
        let diff;
        if (girlNakshatra >= boyNakshatra) {
            diff = girlNakshatra - boyNakshatra;
        } else {
            diff = 27 - boyNakshatra + girlNakshatra;
        }
        const remainder = diff % 9;
        // Good remainders: 2, 4, 6, 8, 9 (0 when divided)
        // From Excel: 0, 1, 2, 4, 6, 8 give 3 points
        const goodRemainders = [0, 1, 2, 4, 6, 8];
        return goodRemainders.includes(remainder) ? 3 : 0;
    }

    /**
     * 2. GANA KOOTA (4 points max)
     * Measures temperament compatibility
     */
    function calculateGana(girlNakshatra, boyNakshatra) {
        const girlGana = GANA[girlNakshatra - 1];
        const boyGana = GANA[boyNakshatra - 1];
        const diff = Math.abs(girlGana - boyGana);
        
        if (diff === 0) return 4;  // Same Gana
        if (diff === 1) return 2;  // Adjacent Ganas
        return 0;  // Opposite Ganas (Deva-Rakshasa)
    }

    /**
     * 3. YONI KOOTA (4 points max)
     * Measures physical/intimate compatibility
     */
    function calculateYoni(girlNakshatra, boyNakshatra) {
        const girlAnimal = YONI_ANIMAL[girlNakshatra - 1];
        const boyAnimal = YONI_ANIMAL[boyNakshatra - 1];
        const girlSex = YONI_SEX[girlNakshatra - 1];
        const boySex = YONI_SEX[boyNakshatra - 1];

        // Check if enemies
        for (const pair of ENEMY_ANIMALS) {
            if ((girlAnimal === pair[0] && boyAnimal === pair[1]) ||
                (girlAnimal === pair[1] && boyAnimal === pair[0])) {
                return 0;
            }
        }

        // Check if prey relationship
        for (const pair of PREY_PAIRS) {
            if ((girlAnimal === pair[0] && boyAnimal === pair[1]) ||
                (girlAnimal === pair[1] && boyAnimal === pair[0])) {
                return 0;
            }
        }

        // Same animal
        if (girlAnimal === boyAnimal) {
            if (girlSex === 'F' && boySex === 'M') return 4;  // Natural order
            if (girlSex === 'M' && boySex === 'F') return 3;  // Reversed
            return 2;  // Same sex
        }

        // Different animals (not enemies or prey)
        if (girlSex === 'F' && boySex === 'M') return 2;  // Natural order
        return 1;  // Other combinations
    }

    /**
     * 4. RASI KOOTA (7 points max)
     * Measures emotional and mental compatibility
     * Position is counted from BOY's rashi to GIRL's rashi
     */
    function calculateRasi(girlRashi, boyRashi) {
        // Count position from boy to girl
        let position;
        if (girlRashi >= boyRashi) {
            position = girlRashi - boyRashi + 1;
        } else {
            position = 12 - boyRashi + girlRashi + 1;
        }

        // Rasi Koota scoring based on position
        // 1st position (same rashi) = 7 points
        // 2nd, 12th position = 0 points (dwi-dwadasa)
        // 3rd, 11th position = 5 points (trine related)
        // 4th, 10th position = 4 points
        // 5th, 9th position = 7 points (trine)
        // 6th, 8th position = 0 points (shashtashtaka - very bad)
        // 7th position = 7 points (sama-saptama - opposite but compatible)

        const positionPoints = {
            1: 7,   // Same rashi
            2: 0,   // Dwi-dwadasa
            3: 5,   // Trine related
            4: 4,   // 
            5: 7,   // Trine (excellent)
            6: 0,   // Shashtashtaka (bad)
            7: 0,   // Sama-saptama - traditionally controversial
            8: 0,   // Shashtashtaka (bad)
            9: 7,   // Trine (excellent)
            10: 4,  //
            11: 5,  // Trine related
            12: 0   // Dwi-dwadasa
        };

        // Check for exceptions that neutralize bad positions
        if (positionPoints[position] === 0) {
            const girlLord = RASHI_LORDS[girlRashi - 1];
            const boyLord = RASHI_LORDS[boyRashi - 1];
            
            // If same lord or friendly lords, give 3 points instead of 0
            if (girlLord === boyLord) {
                return 3;
            }
            
            const girlFriends = FRIENDS[girlLord] || [];
            const boyFriends = FRIENDS[boyLord] || [];
            
            if (girlFriends.includes(boyLord) || boyFriends.includes(girlLord)) {
                return 3;
            }
            
            return 0;
        }

        return positionPoints[position] || 0;
    }

    /**
     * 5. RASYADHIPATI KOOTA (5 points max)
     * Measures planetary lord compatibility
     */
    function calculateRasyadhipati(girlRashi, boyRashi) {
        const girlLord = RASHI_LORDS[girlRashi - 1];
        const boyLord = RASHI_LORDS[boyRashi - 1];

        // Same lord
        if (girlLord === boyLord) return 5;

        const girlFriends = FRIENDS[girlLord] || [];
        const boyFriends = FRIENDS[boyLord] || [];
        const girlEnemies = ENEMIES[girlLord] || [];
        const boyEnemies = ENEMIES[boyLord] || [];

        const girlFriendToBoy = girlFriends.includes(boyLord);
        const boyFriendToGirl = boyFriends.includes(girlLord);
        const girlEnemyToBoy = girlEnemies.includes(boyLord);
        const boyEnemyToGirl = boyEnemies.includes(girlLord);

        // Both are friends to each other
        if (girlFriendToBoy && boyFriendToGirl) return 5;

        // One friend, one neutral
        if ((girlFriendToBoy && !boyEnemyToGirl) || (boyFriendToGirl && !girlEnemyToBoy)) {
            if (!girlEnemyToBoy && !boyEnemyToGirl) return 4;
        }

        // Friend and Enemy
        if ((girlFriendToBoy && boyEnemyToGirl) || (boyFriendToGirl && girlEnemyToBoy)) return 1;

        // Both neutral
        if (!girlFriendToBoy && !boyFriendToGirl && !girlEnemyToBoy && !boyEnemyToGirl) return 3;

        // Neutral and Enemy
        if ((girlEnemyToBoy && !boyFriendToGirl) || (boyEnemyToGirl && !girlFriendToBoy)) return 1;

        // Both enemies
        if (girlEnemyToBoy && boyEnemyToGirl) return 0;

        return 1;
    }

    /**
     * 6. RAJJU KOOTA (5 points max)
     * Measures longevity of spouse and marriage
     */
    function calculateRajju(girlNakshatra, boyNakshatra) {
        const girlRajju = RAJJU[girlNakshatra - 1];
        const boyRajju = RAJJU[boyNakshatra - 1];
        
        // Different Rajju = Good
        if (girlRajju !== boyRajju) return 5;
        return 0;  // Same Rajju = Bad
    }

    /**
     * 7. VEDHA KOOTA (2 points max)
     * Measures affliction between nakshatras
     */
    function calculateVedha(girlNakshatra, boyNakshatra) {
        // Check main Vedha pairs
        for (const pair of VEDHA_PAIRS) {
            if ((girlNakshatra === pair[0] && boyNakshatra === pair[1]) ||
                (girlNakshatra === pair[1] && boyNakshatra === pair[0])) {
                return 0;
            }
        }

        // Check Mrigasira-Chitra-Dhanistha triangle
        for (const pair of VEDHA_TRIANGLE) {
            if ((girlNakshatra === pair[0] && boyNakshatra === pair[1]) ||
                (girlNakshatra === pair[1] && boyNakshatra === pair[0])) {
                return 0;
            }
        }

        return 2;  // No Vedha
    }

    /**
     * 8. VASYA KOOTA (2 points max)
     * Measures mutual attraction and control
     * 2 points if mutual vasya, 1 point if one-sided, 0 if none
     */
    function calculateVasya(girlRashi, boyRashi) {
        const girlVasya = VASYA[girlRashi] || [];
        const boyVasya = VASYA[boyRashi] || [];

        const girlHasVasyaOnBoy = girlVasya.includes(boyRashi);
        const boyHasVasyaOnGirl = boyVasya.includes(girlRashi);

        if (girlHasVasyaOnBoy && boyHasVasyaOnGirl) {
            return 2;  // Mutual vasya
        }
        if (girlHasVasyaOnBoy || boyHasVasyaOnGirl) {
            return 1;  // One-sided vasya
        }
        return 0;  // No vasya
    }

    /**
     * 9. MAHENDRA KOOTA (2 points max)
     * Measures prosperity and progeny
     * Girl's 1-indexed position from boy's nakshatra must be 4th, 7th, 10th, 13th, 16th, 19th, 22nd, 25th
     */
    function calculateMahendra(girlNakshatra, boyNakshatra) {
        // Count girl's position from boy's nakshatra (1-indexed)
        let diff;
        if (girlNakshatra > boyNakshatra) {
            diff = girlNakshatra - boyNakshatra;
        } else if (girlNakshatra < boyNakshatra) {
            diff = 27 - boyNakshatra + girlNakshatra;
        } else {
            diff = 0; // Same nakshatra
        }
        // 1-indexed position: same = 1, next = 2, etc.
        const position = diff + 1;
        const goodPositions = [4, 7, 10, 13, 16, 19, 22, 25];
        if (goodPositions.includes(position)) return 2;
        return 0;
    }

    /**
     * 10. STREE DEERGHA KOOTA (2 points max)
     * Measures woman's fortune and longevity
     * Girl's nakshatra must be AT LEAST 9 positions AFTER boy's (no wrapping)
     * i.e., girl's nakshatra number - boy's nakshatra number >= 9
     */
    function calculateStreeDeergha(girlNakshatra, boyNakshatra) {
        // Simple difference: girl must be ahead by at least 9
        // Only count if girl is actually ahead (no circular wrapping)
        if (girlNakshatra > boyNakshatra) {
            const diff = girlNakshatra - boyNakshatra;
            if (diff >= 9) return 2;
        }
        return 0;
    }

    // ============ MAIN ENGINE OBJECT ============
    const CelestialEngine = {
        rashi: RASHI,
        nakshatra: NAKSHATRA,
        symbols: SYMBOLS,

        // Get nakshatras for a specific rashi
        getNakshatrasForRashi: function(rashiNum) {
            return RASHI_NAKSHATRA_MAP[rashiNum] || [];
        },

        // Get nakshatra details
        getNakshatraDetails: function(nakshatraNum) {
            return {
                name: NAKSHATRA[nakshatraNum - 1],
                gana: GANA[nakshatraNum - 1],
                ganaName: GANA[nakshatraNum - 1] === 1 ? 'Deva' : (GANA[nakshatraNum - 1] === 2 ? 'Nara' : 'Rakshasa'),
                animal: YONI_ANIMAL[nakshatraNum - 1],
                sex: YONI_SEX[nakshatraNum - 1],
                rajju: RAJJU[nakshatraNum - 1],
                rashi: NAKSHATRA_RASHI[nakshatraNum - 1]
            };
        },

        // Get rashi lord
        getRashiLord: function(rashiNum) {
            return RASHI_LORDS[rashiNum - 1];
        },

        // Get lord full name
        getLordName: function(lord) {
            const names = {
                'Su': 'Sun (Surya)',
                'Mo': 'Moon (Chandra)',
                'Ma': 'Mars (Mangal)',
                'Me': 'Mercury (Budha)',
                'Ju': 'Jupiter (Guru)',
                'Ve': 'Venus (Shukra)',
                'Sa': 'Saturn (Shani)'
            };
            return names[lord] || lord;
        },

        // Main computation function
        compute: function(girlRashi, girlNakshatra, boyRashi, boyNakshatra) {
            const results = {
                dina: calculateDina(girlNakshatra, boyNakshatra),
                gana: calculateGana(girlNakshatra, boyNakshatra),
                yoni: calculateYoni(girlNakshatra, boyNakshatra),
                rasi: calculateRasi(girlRashi, boyRashi),
                rasiadhipati: calculateRasyadhipati(girlRashi, boyRashi),
                rajju: calculateRajju(girlNakshatra, boyNakshatra),
                vedha: calculateVedha(girlNakshatra, boyNakshatra),
                vasya: calculateVasya(girlRashi, boyRashi),
                mahendra: calculateMahendra(girlNakshatra, boyNakshatra),
                streedeergha: calculateStreeDeergha(girlNakshatra, boyNakshatra)
            };

            // Calculate total
            results.total = results.dina + results.gana + results.yoni + results.rasi + 
                           results.rasiadhipati + results.rajju + results.vedha + 
                           results.vasya + results.mahendra + results.streedeergha;
            
            results.percentage = (results.total / 36) * 100;

            // Determine verdict
            if (results.total < 18) results.verdict = 'Bad';
            else if (results.total < 23) results.verdict = 'Moderate';
            else if (results.total < 26) results.verdict = 'Good';
            else if (results.total < 29) results.verdict = 'Very Good';
            else results.verdict = 'Excellent';

            // Max points for each koota
            results.max = {
                dina: 3, gana: 4, yoni: 4, rasi: 7, rasiadhipati: 5,
                rajju: 5, vedha: 2, vasya: 2, mahendra: 2, streedeergha: 2, total: 36
            };

            return results;
        },

        // Get Gana name
        getGana: function(nakshatraNum) {
            const g = GANA[nakshatraNum - 1];
            return g === 1 ? 'Deva' : (g === 2 ? 'Nara' : 'Rakshasa');
        },

        // Get Yoni details
        getYoni: function(nakshatraNum) {
            return {
                animal: YONI_ANIMAL[nakshatraNum - 1],
                sex: YONI_SEX[nakshatraNum - 1]
            };
        },

        // Get Rajju
        getRajju: function(nakshatraNum) {
            return RAJJU[nakshatraNum - 1];
        },

        // Get Lord abbreviation
        getLord: function(rashiNum) {
            return RASHI_LORDS[rashiNum - 1];
        }
    };

    // Export to global scope
    w.CosmicEngine = CelestialEngine;

})(window);
