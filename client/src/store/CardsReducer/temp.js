// Old code to fetch images from firebase
    // let allCards = []
    // for (const cardType of cardsToFetch) {
    //     console.log(cardType)
    //     const fetchUrl = `http://localhost:5000/${cardType}`
    //     const response = await fetch(fetchUrl)
    //     let outputCards = await response.json()
    //     for (const card of outputCards) {
    //         const firebasePath = `/${mapCardToImageFolder[cardType]}/${card.image_id}/${card.image_id}.png`
    //         const imageUrl = await queryImage(firebasePath)
    //         const newCard = {
    //             ...card,
    //             imageUrl: imageUrl,
    //             cardType: cardType.replace('Cards', ''),
    //         }
    //         allCards.push(newCard)
    //     }
    // }
    // console.log(allCards)
    // return allCards