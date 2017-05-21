# ShopAlert

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


### Skład grupy projektowej:
Mateusz Galant 180159, dzienne
Radosław Celary 179861, dzienne
