# Basic Knowledge

1.  Package to be used: `flutter_riverpod`
2.  Inject `ProviderScope()`  at the root
3.  Create Provider using `StateProvider()`
4.  Consumer class extends `ConsumerWidget`
5.  Use `ref.read()`  to change the state



> Key Pointing in Coding:

```dart
// Wrapper the whole app with ProviderScope
void main() => runApp(const ProviderScope(child: MainApp()));

// Define a state provider, that can listen and change state
final counterStateProvider = StateProvider<int>((ref) => 0);

// Create a Widget that extends ConsumerWidget and override build function
class HomeScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
  // Create variable which listen to state change 
  var value = ref.watch(counterStateProvider);
  
    return Column(
      children: [
        Text("Value: $value"),
        // using read to change state value
        FlattenButton(
          onPress: () => ref.read(counterStateProvider.notifier).state++,
          child: Icon(Icons.add),
        ),
      ],
    );
  }
}

```



> `Consumer` and  `ConsumerWidget`&#x20;

In previous demo, we use the ConsumerWidget to create a Widget that can read state from riverpod. But sometimes we can also use Stateless/Stateful Widget, but should combine with Consumer to read riverpod state. like following:

```dart
class HomePage extends StatelessWidget {
  const HomePage({super.key});
  
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Consumer(
        builder: (context, ref, cild) => Text(ref.read(helloWorldProvider)),
      ),
    );
  }
}
```



# Read and Modify Data

Like Basic Knowledge, we can read data from riverpod by `Provider`， but it doesn't allow us to modify the data. So if we want to change riverpod data, `StateProvider` should be your choice.

1.  Create state using `StateProvider`
2.  Using `ConsumerStatefulWidget`  to create a stateful widget which listening to provider state change
3.  Using `ref.read(counterProvider.notifier)`  to change provider state value
4.  Reset provider state
    -   `ref.invalidate(counterProvider)`
    -   `ref.refresh(counterProvider)`
5.  Listen values change, and obtaining the previous values
    -   `ref.listen(counterProvider, (prev, next){})`

```dart
// 1. create stateful provider
final counterProvider = StateProvider<int>((ref) => 0);


// 2. change provider state
// a button:
FloatingActionButton(
  onPressed: () => ref.read(counterProvider.notifier).update((state) => state + 1),
  child: const Icon(Icons.add),
);

// 3. create a stateful widget listening to provider change
class HomePage extends ConsumerStatefulWidget {
  const HomePage({super.key});
  
  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _HomePageState();
}

class _HomePageState extends ConsumerState<HomePage> {
   
   @override
   Widget build(BuildContext context) {
     return Center(
       child: Text(ref.watch(counterProvider).toString()),
     );
   }
}

// 4. listen value change, and get previous values 
ref.listen(counterProvider, (prev, next) {
  if (next == 5) {
    ScaffoldMessager.of(context).showSnackBar(
      SnackBar(content: Text('The value is $next')),
    );
  }
});
```



# Listen Complicate State&#x20;

**Advanges**:&#x20;

1.  `StateNotifierProvider` is a provider that is used to liseten to and expose a `StateNotifier`
2.  `StateNotifierProvider` along with `StateNotifier` is Riverpod's recommend solution for managing state which may change in reaction to a user interaction.
3.  Used for centralizing the Business Logic in a single place, improving maintainability over time

**Usage**:

1.  Create a class which extends `StateNotifier` to store the provider data
2.  Using `StateNotifierProvider` to create a state provider

```dart
// 1. create state
class Counter extends StateNotifier<int> {
  Counter(): super(0);
  
  void increment() => state+=2;
}

// 2. create a provider
final counterProvider = StateNotifierProvider<Counter, int>((ref) => Counter());

// the usage is same with StateProvder
```



# Asynchronize State

Asynchronized provider is extreamly useful when fetch data from network.&#x20;

a example is that, we create a model, and using http to call for all data, after that change the raw data into custmized mode, and then store it in provider.&#x20;

because we need fetch data, `http` package is needs,&#x20;

1.  Create a model

```dart
// user_model.data
class UserModel {
  final int id;
  final String email;
  final String firstname;
  final String lastname;
  final String avatar;
  
  UserModel(
      {required this.id,
      required this.email,
      required this.firstname,
      required this.lastname,
      required this.avatar});

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
        id: json['id'],
        email: json['email'],
        firstname: json['first_name'],
        lastname: json['last_name'],
        avatar: json['avatar']);
  }
}
```



1.  Create a service to get all data from network

```dart
class ApiService {
  static const endpoint = 'https://reqres.in/api/users?page=1';

  Future<List<UserModel>> getUser() async {
    Response response = await get(Uri.parse(endpoint));
    if (response.statusCode == 200) {
      final List result = jsonDecode(response.body)['data'];
      return result.map((e) => UserModel.fromJson(e)).toList();
    }

    throw Exception(response.reasonPhrase);
  }
}
```



1.  create a provider, and using that data in widget.

```dart
final apiProvider = Provider<ApiService>((ref) => ApiService());
final userDataProvider =
    FutureProvider<List<UserModel>>((ref) => ref.read(apiProvider).getUser());

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userData = ref.watch(userDataProvider);

    return userData.when(
        data: (data) => ListView.builder(
              itemCount: data.length,
              itemBuilder: (context, index) => ListTile(
                title: Text("${data[index].firstname} ${data[index].lastname}"),
                subtitle: Text(data[index].email),
                leading: CircleAvatar(child: Image.network(data[index].avatar)),
              ),
            ),
        error: ((error, stackTrace) => Text(error.toString())),
        loading: () => const Center(
              child: CircularProgressIndicator(),
            ));
  }
}

```



# Stream data

Using `StreamProvider`  we can continually listen to value changes from data provider.

```dart
// 1. create a stream provider
final streamProvider = StreamProvider(
  (ref) => Stream.periodic(
      const Duration(seconds: 1), (compurationCount) => compurationCount),
);

// 2. like async provider, we can get the data using when function 
Widget build(BuildContext context, WidgetRef ref) {
  final streamData = ref.watch(streamProvider);
  return streamData.when(
    data: (data) => Center(
      child: Text(data.toString()),
    ),
    error: (error, stachTrace) => Text(error.toString()),
    loading: () => const Center(
      child: CircularProgressIndicator(),
    ),
  );
}

```



# Other Techs

## Dispose cache

By default the provider state will be cached when the page is closed, for example, user go to a new page, and then if go back, the state will be kept.

we can use `autoDispose` to disable cache state, and also using timer function, to listen when to dispose it after a time

```dart
final counterProvider = StateNotifierProvider.autoDispose<CounterDemo, int>((ref) {
  final link = ref.keepAlive();
  final timer = Timer(const Duration(seconds: 10), () => link.close());
  
  ref.onDispose(() => timer.cancel());
  return CounterDemo();
});
```



## Family Modifier

By using variable `famlify` , we can pass data to provider in initialize stage.

```dart
// create provider
final nameProvider =
    Provider.family<String, String>((ref, arg) => "provider value: $arg");
    

// pass data initially
final name = ref.read(nameProvider("Data"));

```



## Selector

In the condition the state is a Object type, the whole widget will be renderred if user change a element by default. So to reduce the times of renderring, we can use `select`  to indicate which element will cause the rerenderring.

1.  The object should be immutable
2.  using `select` to show which element will cause widget rerenderring

```dart
// 1. usermodel
@immutable
class UserModel extends Equatable {
  final String email;
  final String username;
  final String address;
  // ....
}

// create a user provider
final userProvider = StateNotifierProvider<UserNotifier, UserModel>((ref) => UserNotifier());

// 3. using select to pick wanted values
final user = ref.watch(userProvider.select((value) => <String, dynamic>{'username': value.username, 'email': value.email}));
```



## Generator

**Problems to solve:**

1.  Error Prone
2.  Not auto disposable
3.  family modifier can take only one parameter
4.  to simplify the coding of riverpod

**packages to needed:** `rivperpod_annotation`  dev: `riverpod_generator`, `build_runner`

1.  we need to create a class or function that annotated with riverpod
2.  using command `dart build_runner watch`  to generator stereotype code&#x20;

```dart
// function
@riverpod
String name(NameRef ref) {
  return 'Jack New';
}

part 'counter_norifier.g.dart';
@riverpod
class CounterNotifier extends _$CounterNotifier {
  @override
  int build(){
    return 0;
  }
  
  void increment() => state++;
  
  void decrement() => state--;
}
```



## Filter

By using filter, we can select from a list-like state to choose the wanted data.

