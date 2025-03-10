import os
import requests
import json

UPLOAD_URL = "http://127.0.0.1:8000/api/products/"

IMG_PATH = r"/home/pm/Downloads/Jelmez webshop - vizsgaremek-20250310T114557Z-001/Jelmez webshop - vizsgaremek/jelmezek"

DATA = products = [
    {"name": "Hókuszpók jelmez", "price": 15490, "accessories": ["Tunika", "Kopasz paróka", "Lábmelegítők", "Cipőfedők"], "not_accessories": [], "category": "men", "image": "hokuszpok-jelmez-hupikek-torpikek.jpg"},
    {"name": "Joker jelmez", "price": 18290, "accessories": ["Kabát", "Gallér", "Nyakkendő", "Mellény", "Nadrág", "Kesztyű"], "not_accessories": [], "category": "men", "image": "joker-jelmez-ferfiaknak-the-dark-knight.jpg"},
    {"name": "Vilma jelmez", "price": 9590, "accessories": ["Ruha", "Paróka", "Nyaklánc", "Lábak"], "not_accessories": [], "category": "women", "image": "vilma-ni-jelmez-a-flintstones.jpg"},
    {"name": "Piroska és a farkas jelmez", "price": 9890, "accessories": ["Ruha", "Köpeny"], "not_accessories": ["Harisnya", "Kosár"], "category": "women", "image": "piroska-es-a-farkas-jelmez-felntteknek.jpg"},
    {"name": "Kleopátra jelmez", "price": 8990, "accessories": ["Ruha", "Gallér", "Öv", "Korona"], "not_accessories": [], "category": "women", "image": "kleopatra-jelmez-nknek.jpg"},
    {"name": "Fogoly jelmez", "price": 5990, "accessories": ["Ing", "Öv", "Sapka"], "not_accessories": ["Cipő"], "category": "men", "image": "fogoly-jelmez.jpg"},
    {"name": "Harley Quinn jelmez", "price": 15690, "accessories": ["Dzseki hímzéssel és flitterrel", "Rövidnadrág", "Logózott póló", "Bőröv", "Kesztyű", "Harisnya"], "not_accessories": ["Paróka"], "category": "women", "image": "harley-quinn-jelmez-suicide-squad.jpg"},
    {"name": "Macskanő jelmez", "price": 17990, "accessories": ["Elasztikus szublimált ruha", "Kesztyű", "Maszk", "Fülpánt", "Fülvédő", "Öv"], "not_accessories": [], "category": "women", "image": "catwoman-jelmez.jpg"},
    {"name": "Deluxe Mikulás jelmez", "price": 14690, "accessories": ["Nadrág", "Öv", "Kabát", "Csizmahuzat", "Sapka"], "not_accessories": ["Paróka", "Szakáll", "Kesztyű"], "category": "men", "image": "deluxe-mikulas-jelmez-ferfiaknak.jpg"},
    {"name": "Pompomlány ruha", "price": 6490, "accessories": ["Ruha"], "not_accessories": ["Pompom", "Harisnya"], "category": "women", "image": "pompomlany-ruha.jpg"},
    {"name": "Frédi jelmez", "price": 10990, "accessories": ["Ruha", "Paróka", "Nyakkendő"], "not_accessories": [], "category": "men", "image": "fredi-jelmez-ferfiaknak-the-flintstones.jpg"},
    {"name": "Top Gun pilóta jelmez", "price": 12290, "accessories": [], "not_accessories": [], "category": "men", "image": "top-gun-pilota-jelmez.jpg"},
    
    {"name": "Pókember jelmez", "price": 12590, "accessories": ["Kezeslábas", "Kalap"], "not_accessories": ["Cipő"], "category": "children", "image": "a-pokember-elkepeszt-kalandjai-jelmez-gyerekeknek.jpg"},
    {"name": "Batman jelmez", "price": 12490, "accessories": ["Kezeslábas", "Öv", "Köpeny maszkkal", "Cipőhuzatok"], "not_accessories": [], "category": "children", "image": "batman-jelmez-gyerekeknek.jpg"},
    {"name": "Légikisasszony jelmez", "price": 7190, "accessories": ["Ing", "Szoknya", "Nyaksál", "Sapka"], "not_accessories": [], "category": "children", "image": "legikisasszony-jelmez-lanyoknak.jpg"},
    {"name": "Törpilla jelmez", "price": 6990, "accessories": ["Ruha nyomattal", "Farokkal", "Harisnya", "Kalap"], "not_accessories": ["Paróka"], "category": "children", "image": "torpilla-jelmez-gyerekeknek.jpg"},
    {"name": "Katicabogár jelmez", "price": 6690, "accessories": ["Ruha", "Fejpánt antennákkal", "Szárnyakkal"], "not_accessories": [], "category": "children", "image": "katicabogar-jelmez-lanyoknak.jpg"},
    {"name": "Pantomim jelmez", "price": 7990, "accessories": ["Nadrág nadrágtartóval", "Ing", "Beret sapka", "Kesztyű", "Kendő"], "not_accessories": [], "category": "children", "image": "pantomim-jelmez-fiuknak.jpg"},
    {"name": "Macska jelmez", "price": 8590, "accessories": ["Kezeslábas", "Galléros harang", "Fejpánt fülekkel"], "not_accessories": [], "category": "children", "image": "macska-jelmez-lanyoknak.jpg"},
    {"name": "Rendőr jelmez", "price": 6890, "accessories": ["Nadrág", "Póló", "Öv", "Nyakkendő", "Sapka"], "not_accessories": ["Szemüveg", "Bilincs"], "category": "children", "image": "rendr-jelmez-fiuknak.jpg"},
    {"name": "Nővér jelmez", "price": 6490, "accessories": ["Ruha", "Kötény", "Ápolónői sapka"], "not_accessories": ["Harisnyanadrág", "Fecskendő"], "category": "children", "image": "nver-jelmez-lanyoknak.jpg"},
    {"name": "Kalóz jelmez", "price": 10590, "accessories": ["Ing", "Mellény", "Nadrág", "Vállpánt", "Öv", "Kalap", "Bandana kendő", "Cipőhuzatok"], "not_accessories": ["Kard"], "category": "children", "image": "kaloz-jelmez-fiuknak-karibi-kollekcio.jpg"},
    {"name": "Luxus Bohóc jelmez", "price": 7590, "accessories": ["Kezeslábas", "Nyakfodor", "Sapka klipszekkel"], "not_accessories": ["Paróka"], "category": "children", "image": "luxus-bohoc-jelmez-fiuknak.jpg"},
    {"name": "Deluxe boszorkány jelmez", "price": 12990, "accessories": ["Zakó", "Szoknya", "Öv", "Masnis kalap"], "not_accessories": ["Katlan", "Seprű"], "category": "children", "image": "deluxe-boszorkany-jelmez-lanyoknak.jpg"}
]


def upload_products(token):
    for product in DATA:
        image_path = os.path.join(IMG_PATH, product['image'])

        with open(image_path, 'rb') as image_file:
            files = {'image': (product['image'], image_file, 'image/jpeg')}
            data = {
                'name': product['name'],
                'price': product['price'],
                'category': product['category'],
                'accessories': json.dumps(product['accessories']),
                'not_accessories': json.dumps(product['not_accessories']),
            }

            res = requests.post(UPLOAD_URL, files=files, data=data, headers={'Authorization': f'Bearer {token}'})

            if res.status_code == 201:
                print(f"{product['name']} sikeresen feltöltve.")
            else:
                print(res.json())


if __name__ == "__main__":
    res = requests.post('http://127.0.0.1:8000/api/user/token/', json={'username': 'admin', 'password': 'admin'})
    print(res.status_code)
    token = res.json().get('access_token')
    
    upload_products(token)
