# ShopAlert

![shopalert](https://raw.githubusercontent.com/itsGali/ShopAlert/master/res/iconoriginal.png)

Aplikacja "Shop Alert" jest implementacją zaspokojenia potrzeby przesyłania i zachowania listy zakupów pomiędzy dwoma urządzeniami. Pierwszy użytkownik uruchamia aplikację, wybiera produkty z listy (zasilonej ze zdalnego api lub dodając własne), po czym tworzy listę i wysyła do wybranego użytkownika (numer telefonu lub książka adresowa). Dane przekształcane są do odpowiedniego formatu i przesyłane przez wiadomość sms na wybrany numer. Drugi użytkownik odbiera wiadomość w aplikacji. Jest tam w postaci listy zakupów, które można oznaczyć jako kupione bądź nie dostępne (jeśli nie dostępny aplikacja może poinformować nadawce o niedostępności produktu). Po oznaczeniu wszystkich produktów wysyłana zostaje wiadomość ze statusem zakupów do użytkownika pierwszego.


### Kluczowe funkcjonalności:
  * tworzenie listy zakupów opierało się będzie o dane pobrane z api,
  * możliwe będzie dodanie własnego produktu jeśli uznamy, że dane z api są nie wystarczające,
  * do każdego produkty będzie można dodać komentarz (zwierający np. markę produktu, preferowany skład itp.) i priorytet,
  * do całej listy można dodać komentarz (np. preferowany sklep),
  * możliwość, nie obowiązek, przesłanie potwierdzenia ze statusem zakupów,
  * rozpoznawanie przez aplikację wiadomości skierowanych właśnie do niej,
  * dostęp do otrzymanych list zakupów,
  * możliwość zamknięcia nie pełnej listy zakupów jeśli z jakichś powodów z niej zrezygnujemy,
  
 
### Wykorzystane pluginy:

Plugin |	Source |	Version |	Installed |	Latest |	Platforms
| ------ | ------ | ------ | ------ | ------ | ------ |
CordovaSMS |  	npm |	0.0.3 |	0.0.3 |	n/a |	android,ios,winphone
cordova-plugin-contacts |   	npm |	2.3.1 |	2.3.1 |	n/a |	android,ios,winphone
cordova-plugin-device |  	npm |	1.1.6 |	1.1.6 |	n/a |	android,ios,winphone
cordova-plugin-dialogs |  	npm |	1.3.3 |	1.3.3 |	n/a |	android,ios,winphone
cordova-plugin-network-information  | 	npm |	1.3.3 |	1.3.3 |	n/a |	android,ios,winphone
cordova-plugin-sim |  	npm |	1.3.3 |	1.3.3 |	n/a |	android,ios,winphone
cordova-plugin-sms |  	npm |	~1.0.5 |	1.0.5 |	n/a |	android,ios,winphone
cordova-plugin-splashscreen |  	npm |	4.0.3 |	4.0.3 |	n/a |	android,ios,winphone
cordova-plugin-whitelist |  	npm |	1.3.2 |	1.3.2 |	n/a |	android,ios,winphone
cordova-sms-plugin  | 	npm	| 0.1.11 |	0.1.11 |	n/a |	android,ios,winphone


### API:
Dane produktów użytych w aplikacji zasilane są z zewnętrznego autorskiego REST API, które może być odpytywane pod kątem:
  * lista grup: 
    ```api.php?type=groups```
  * lista poduktów z danej grupy (ostatnia cyfra to id grupy): 
    ```api.php?type=products&group_id=2```
  * wszystkie dane z api: 
    ```api.php?type=all```
    
Api znajduje się na naszym urządzeniu RaspberryPi (używające odmiany linuxa - Raspbian), które jest podpięte poprzez dynamiczny dns.

### Obsługa aplikacji:

![shopalert1](https://github.com/itsGali/mg-storage/blob/master/imgp/1.png)
![shopalert2](https://github.com/itsGali/mg-storage/blob/master/imgp/2.png)
![shopalert3](https://github.com/itsGali/mg-storage/blob/master/imgp/3.png)
![shopalert4](https://github.com/itsGali/mg-storage/blob/master/imgp/5.png)
![shopalert5](https://github.com/itsGali/mg-storage/blob/master/imgp/6.png)
![shopalert6](https://github.com/itsGali/mg-storage/blob/master/imgp/7.png)


Menu główne aplikacji które pozwala przejść do widoku tworzenia listy lub widoku z listami które zostały wysłane do nas.

Na ekranie tym wpisujemy ,lub wybieramy z listy dostępnych produktów, nazwę produktu. Wpisujemy też jego ilość i wybieramy priorytet, z czterech dostępnych. Do produktu można dołączyć komentarz. Produkt dodajemy do listy przyciskiem "Save".

Widok do tworzenia listy zakupów. Na samej górze wpisujemy lub wybieramy z listy kontaktów odbiorcę. Niżej możemy dodać notatkę dotyczącą całej listy (nie konretnego produktu). Pod tym jest miejsce na listę produktów. Na samym dole są przyciski które odpowiadają za dodanie produktu (otwiera formularz produktu) lub wyłsanie listy. Wysłanie jest możliwe gdy wybierzemy odbiorcę i dodamy co najmniej jeden produkt. Przycisk "Clear" czyści listę.

Zdjęcie to pokazuje jak wygląda tworzona lista produktów z dodanym produktem. Na górze wpisujemy, lub wybieramy z książki adresowej, numer odbiorcy. Poniżej możemy dodać notatkę dla całej listy. Pod nią znajduje się lista produktów które dodaliśmy. Każdy z nich ma nazwę, ilość i komentarz. Pasek po lewej stronie oznacza priorytet (w kolejności od najmniej ważnych - niebieski, zielony, żółty i czerwony) oraz przycisk usunięcia i edycji. Na dole znajdują się przyciski dodania produktu który otwiera formularz produktu oraz przycisk wysłania listy, po kliknięciu zostaniemy poproszeni o potwierdzenia.

Widok ten przedstawia status odebranej listy. Pokazuje kiedy lista została wysłana i od kogo. Wyśiwetla też komentarz. Na środku jest lista produktów w której znajdują się produkty wraz z informacjami o nazwie, ilości i komentarzu. Pasek po lewej oznacza priorytet (w kolejności od najmniej ważnych - niebieski, zielony, żółty i czerwony). Na dole produktu znajduje się przełącznik pozwalający zmieniać jego status. Na samym dole znajduje się przycisk do wysyłania wiadomości o stanie listy.

Widok przedstawia odebrane przez nas listy z podziałem na nowe (jeszcze nie otwierane), otwarte (te które zostały otwarte) i zamknięte (te które sami zamknęliśmy). Można do nich przejść przez kliknięcie opisu zawierającego datę odebrania i koemntarz. Przycisk pod spodem pozwala w zależności od statusu listy otworzyć ją lub zamknąć. Ma to znaczenia informacyjne aby użytkownik nie zawracał sobie głowy zamkniętymi listami.

### Skład grupy projektowej:
Mateusz Galant 180159, dzienne

Radosław Celary 179861, dzienne
