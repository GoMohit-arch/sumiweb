let slideIndex = 0;
showSlides();

function plusSlides(n) {
    slideIndex += n;
    showSlides();
}

function showSlides() {
    let i;
    const slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return; // Ensure slides exist

    if (slideIndex >= slides.length) { slideIndex = 0; }
    if (slideIndex < 0) { slideIndex = slides.length - 1; }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

function sendMessage() {
    const userInput = document.getElementById('chatbot-input').value.trim().toLowerCase();
    if (userInput === '') return;

    displayMessage(userInput, 'user');
    document.getElementById('chatbot-input').value = '';

    // Predefined responses
    const predefinedResponses = {
        'hi': 'Hello! How can I assist you today?',
        'hello': 'Hi there! How can I help you?',
        'thank you': 'You’re welcome! If you need anything else, just let me know.',
        'thanks': 'Thanks for reaching out! How can I assist you further?',
        'help': 'I’m here to assist you with travel advice, booking information, and more. How can I help you today?',
        'goodbye': 'Goodbye! If you have more questions later, feel free to ask. Have a great day!',
        'weather': 'I can provide weather information for your destination. Please specify the location.',
        'places': 'Please let me know the type of places or destinations you are interested in, such as popular tourist spots or local attractions.',
        'advice': 'For travel tips, please specify what kind of advice you need, like packing tips, travel safety, or local customs.',
        'cost': 'I can help with cost-related information. Are you asking about the cost of flights, hotels, or something else?',
        'itinerary': 'To help with your itinerary or schedule, please provide more details about your travel plans or destinations.',
        'transportation': 'I can provide information on local transportation options. Please specify your destination or city.',
        'documents': 'Let me know your destination, and I can provide information on the necessary travel documents like visas or passports.',
        'customs': 'I can provide information on local customs and cultural practices. Please specify the country or region.',
        'currency': 'I can provide currency exchange rates and options. Please specify the currency you need information about.',
        'safety': 'I can offer general safety tips for traveling. Are you looking for tips on a specific location or general advice?',
        'restaurants': 'I can recommend dining options. Please let me know your destination or type of cuisine you prefer.',
        'emergency': 'I can provide information on emergency contacts and services. Please specify your location.',
        'hotels': 'I can help you find hotel information. Are you looking for 5-star, 4-star, 3-star, or 2-star hotels, or something else?',
        '5 star india': 'Here are some top 5-star hotels in India: Taj Mahal Palace, Mumbai [Link](https://www.tajhotels.com/en-in/taj/taj-mahal-palace-mumbai/), The Oberoi Udaivilas, Udaipur [Link](https://www.oberoihotels.com/hotels-in-udaipur/), The Leela Palace, New Delhi [Link](https://www.theleela.com/the-leela-palace-new-delhi/). Let me know if you need more details.',
        '5 star dubai': 'Here are some top 5-star hotels in Dubai: Burj Al Arab Jumeirah [Link](https://www.jumeirah.com/en/stay/dubai/burj-al-arab), Atlantis The Palm [Link](https://www.atlantis.com/dubai/atlantis-the-palm), Armani Hotel Dubai [Link](https://www.armanihotelsandresorts.com/dubai/). Let me know if you need more details.',
        '5 star sri lanka': 'Here are some top 5-star hotels in Sri Lanka: Anantara Peace Haven Tangalle Resort [Link](https://www.anantara.com/en/peace-haven-tangalle), Cinnamon Grand Colombo [Link](https://www.cinnamonhotels.com/cinnamon-grand-colombo), The Kingsbury Colombo [Link](https://www.thekingsburyhotel.com/). Let me know if you need more details.',
        '5 star thailand': 'Here are some top 5-star hotels in Thailand: Mandarin Oriental, Bangkok [Link](https://www.mandarinoriental.com/bangkok/chao-phraya-river/luxury-hotel), The Peninsula Bangkok [Link](https://www.peninsula.com/en/bangkok), The Siam [Link](https://www.thesiamhotel.com/). Let me know if you need more details.',
        '5 star nepal': 'Here are some top 5-star hotels in Nepal: Hotel Yak & Yeti, Kathmandu [Link](https://www.yakandyeti.com/), Hyatt Regency Kathmandu [Link](https://www.hyatt.com/en-US/hotel/nepal/hyatt-regency-kathmandu/ktmhy), The Dwarika\'s Hotel [Link](https://www.dwarikas.com/). Let me know if you need more details.',
        '5 star vietnam': 'Here are some top 5-star hotels in Vietnam: Sofitel Legend Metropole Hanoi [Link](https://www.sofitel-legend-metropole-hanoi.com/), InterContinental Danang Sun Peninsula Resort [Link](https://www.ihg.com/intercontinental/hotels/us/en/danang/dadha/hoteldetail), Park Hyatt Saigon [Link](https://www.parkhyattsaigon.com/). Let me know if you need more details.',
        '4 star india': 'Here are some top 4-star hotels in India: Holiday Inn Mumbai International Airport [Link](https://www.ihg.com/holidayinn/hotels/us/en/mumbai/bomii/hoteldetail), Radisson Blu Hotel, New Delhi [Link](https://www.radissonhotels.com/en-us/hotels/radisson-blu-delhi), ITC Grand Chola, Chennai [Link](https://www.itchotels.com/hotels/chennai/itc-grand-chola). Let me know if you need more details.',
        '4 star dubai': 'Here are some top 4-star hotels in Dubai: Hilton Garden Inn Dubai Mall of the Emirates [Link](https://www.hilton.com/en/hotels/dxbgggi-hilton-garden-inn-dubai-mall-of-the-emirates/), Four Points by Sheraton Sheikh Zayed Road [Link](https://www.marriott.com/hotels/travel/dxbsh-four-points-dubai-sheikh-zayed-road/). Let me know if you need more details.',
        '4 star sri lanka': 'Here are some top 4-star hotels in Sri Lanka: Cinnamon Lakeside Colombo [Link](https://www.cinnamonhotels.com/cinnamon-lakeside-colombo), Hotel Renuka Colombo [Link](https://www.hotelrenuka.lk/). Let me know if you need more details.',
        '4 star thailand': 'Here are some top 4-star hotels in Thailand: Holiday Inn Resort Phuket [Link](https://www.ihg.com/holidayinnresorts/hotels/us/en/phuket/hktph/hoteldetail), Centara Grand at CentralWorld [Link](https://www.centarahotelsresorts.com/centaragrand/cgcw). Let me know if you need more details.',
        '4 star nepal': 'Here are some top 4-star hotels in Nepal: Hotel Shanker, Kathmandu [Link](https://www.hotelshanker.com/), The Everest Hotel, Kathmandu [Link](https://www.everesthotel.com.np/). Let me know if you need more details.',
        '4 star vietnam': 'Here are some top 4-star hotels in Vietnam: Hanoi La Siesta Hotel & Spa [Link](https://www.hanoilasiestahotel.com/), Hotel Nikko Saigon [Link](https://www.hotelnikkosaigon.com.vn/). Let me know if you need more details.',
        '3 star india': 'Here are some top 3-star hotels in India: Treebo Trend Hotel Planet Residency, Mumbai [Link](https://www.treebo.com/hotels-in-mumbai/treebo-trend-hotel-planet-residency/), Comfort Inn The President, New Delhi [Link](https://www.choicehotels.com/india/new-delhi/comfort-inn-hotels), Hotel Heritage, Jaipur [Link](https://www.heritagehotels.in/). Let me know if you need more details.',
        '3 star dubai': 'Here are some top 3-star hotels in Dubai: Citymax Hotel Bur Dubai [Link](https://www.citymaxhotels.com/hotels/bur-dubai/), Ibis Styles Dubai Jumeira [Link](https://all.accor.com/hotel/9242/index.en.shtml), Premier Inn Dubai International Airport [Link](https://www.premierinn.com/ae/dubai/international-airport/). Let me know if you need more details.',
        '3 star sri lanka': 'Here are some top 3-star hotels in Sri Lanka: Hotel Thilanka, Kandy [Link](https://www.thilanka.com/), Hikkaduwa Beach Hotel, Hikkaduwa [Link](https://www.hikkaduwabeachhotel.com/). Let me know if you need more details.',
        '3 star thailand': 'Here are some top 3-star hotels in Thailand: The Berkeley Hotel Pratunam [Link](https://www.theberkeleyhotel.com/), The Victory Executive Residences [Link](https://www.thevictoryhotel.com/). Let me know if you need more details.',
        '3 star nepal': 'Here are some top 3-star hotels in Nepal: Hotel Narayan, Kathmandu [Link](https://www.hotelnarayan.com/), Hotel Nepalaya, Kathmandu [Link](https://www.hotelnepalaya.com/). Let me know if you need more details.',
        '3 star vietnam': 'Here are some top 3-star hotels in Vietnam: Golden Lotus Hotel, Hanoi [Link](https://www.goldenlotushotel.com/), Bella Villa Cabana, Nha Trang [Link](https://www.bellavillacabana.com/). Let me know if you need more details.',
        'budget india': 'For budget hotels in India, you might want to check out options on platforms like OYO Rooms or Treebo. They offer affordable accommodation across various cities. Let me know if you need specific recommendations.',
        'budget dubai': 'Budget options in Dubai include hotels like Ibis Al Rigga, Premier Inn Dubai International Airport, and Holiday Inn Express Dubai Safa Park. Let me know if you need more details.',
        'budget sri lanka': 'Consider budget options such as Hotel Sapphire, Colombo, or Hotel Thilanka, Kandy. For more details, you might want to check travel review websites.',
        'budget thailand': 'Look into budget hotels like Ibis Bangkok Riverside or Lub d Bangkok Silom. Websites like Agoda can also provide great deals.',
        'budget nepal': 'You might find budget accommodations at places like Hotel Himalaya, Kathmandu, or the Kathmandu Guest House.',
        'budget vietnam': 'For budget options, you could check out hotels like The Light Hotel in Hanoi or the Sky Hotel in Ho Chi Minh City.',
        'hotel reservations': 'I can help you with hotel reservations. Please provide me with the destination, check-in, and check-out dates, and any specific preferences you have.',
        'booking': 'I can assist you with booking hotels, flights, and other travel arrangements. Let me know what you need help with.',
        'travel package': 'Are you looking for a travel package for a specific destination or type of travel? Let me know your preferences.',
        'travel insurance': 'I can provide information on travel insurance options. Are you looking for coverage for a specific trip or general travel insurance?',
        'flight': 'I can help you find flight information. Please specify your departure and arrival cities, and your travel dates.',
        'visa': 'For visa information, please specify your destination country and your nationality.',
        'passport': 'I can provide general information about passport requirements. If you need specific details, please let me know your destination and nationality.',
        'customs': 'I can help with customs information for your destination. Please specify the country you are traveling to.',
        'currency': 'For currency exchange rates, please provide the currency you are interested in converting and the target currency.',
        'emergency': 'In case of emergency, I can provide contact information for local emergency services. Please specify your location.'
    };

    // Generate response
    let response = predefinedResponses['default'];
    for (const key in predefinedResponses) {
        if (userInput.includes(key)) {
            response = predefinedResponses[key];
            break;
        }
    }
    displayMessage(response, 'bot');
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.className = sender;
    document.getElementById('chatbot-messages').appendChild(messageElement);
    document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
}
