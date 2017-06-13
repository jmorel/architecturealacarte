# Architecture à la carte

Le code source du site http://architecturealacarte.fr

Le code est réduit à une simple page html car la logique de l'application est gérée par les [widgets d'OpenDataSoft](https://github.com/opendatasoft/ods-widgets).

Les données sources sont disponibles sur opendatasoft.com:

* [Journées du patrimoine 2015](http://public.opendatasoft.com/explore/dataset/jep2015/?tab=metas)
* [Journées du patrimoine 2016](https://data.opendatasoft.com/explore/dataset/jep_2016_ministculture%40datainfolocale/)
* [Architecture moderne et contemporaine en Île de France](http://public.opendatasoft.com/explore/dataset/architecture-remarquable-idf/?tab=table&disjunctive.debut_construction&disjunctive.fin_construction&disjunctive.architectes)

## Compiler et deployer

Pour faciliter la duplication des pages, un système de template est mis en place. Il faut donc compiler ces templates 
avant de déployer le résultat.

Pour compiler :

```shell
gulp install --dev
gulp build
```

Il est alors possible de servir les sources en local pour s'assurer que tout fonctionne.

Puis, pour déployer:

```shell
gulp deploy
```
