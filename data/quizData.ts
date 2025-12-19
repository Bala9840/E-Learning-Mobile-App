export interface Question {
    id: string;
    text: string;
    options: string[];
    correctIndex: number;
}

export interface Topic {
    id: string;
    name: string;
    level: 'Basic' | 'Intermediate' | 'Advanced';
    questions: Question[];
}

export interface Domain {
    id: string;
    name: string;
    icon: string; // Ionicons name
    topics: Topic[];
}

export const QUIZ_DOMAINS: Domain[] = [
    {
        id: 'web',
        name: 'Web Development',
        icon: 'globe-outline',
        topics: [
            {
                id: 'html-basic',
                name: 'HTML5 Basics',
                level: 'Basic',
                questions: [
                    { id: 'h1', text: 'Which tag is used for the largest heading?', options: ['<h1>', '<head>', '<h6>', '<header>'], correctIndex: 0 },
                    { id: 'h2', text: 'What does HTML stand for?', options: ['Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyper Text Markup Language', 'High Text Machine Language'], correctIndex: 2 },
                    { id: 'h3', text: 'Which element is used for a line break?', options: ['<br>', '<lb>', '<break>', '<ln>'], correctIndex: 0 },
                    { id: 'h4', text: 'Where is the correct place to insert a <title>?', options: ['<body>', '<head>', '<footer>', '<main>'], correctIndex: 1 },
                    { id: 'h5', text: 'Which attribute specifies the URL of an image?', options: ['src', 'href', 'link', 'url'], correctIndex: 0 },
                    { id: 'h6', text: 'Which element defines an unordered list?', options: ['<ul>', '<ol>', '<li>', '<list>'], correctIndex: 0 },
                    { id: 'h7', text: 'How do you create a checkbox?', options: ['<input type="checkbox">', '<check>', '<checkbox>', '<input type="check">'], correctIndex: 0 },
                    { id: 'h8', text: 'Which tag defines a table cell?', options: ['<table>', '<td>', '<tr>', '<tc>'], correctIndex: 1 },
                    { id: 'h9', text: 'What is the correct HTML for making a drop-down list?', options: ['<input type="dropdown">', '<list>', '<select>', '<dropdown>'], correctIndex: 2 },
                    { id: 'h10', text: 'Which HTML5 element defines navigation links?', options: ['<nav>', '<navigation>', '<links>', '<dir>'], correctIndex: 0 }
                ]
            },
            {
                id: 'css-inter',
                name: 'CSS Styling',
                level: 'Intermediate',
                questions: [
                    { id: 'c1', text: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'], correctIndex: 2 },
                    { id: 'c2', text: 'Which property changes background color?', options: ['color', 'bgcolor', 'background-color', 'bg-color'], correctIndex: 2 },
                    { id: 'c3', text: 'How do you center a flex item horizontally?', options: ['align-items: center', 'justify-content: center', 'text-align: center', 'center: true'], correctIndex: 1 },
                    { id: 'c4', text: 'Which pseudo-class selects the mouse-over state?', options: [':hover', ':active', ':focus', ':mouse'], correctIndex: 0 },
                    { id: 'c5', text: 'Which unit is relative to the font-size of the root element?', options: ['em', 'rem', 'px', '%'], correctIndex: 1 },
                    { id: 'c6', text: 'How do you make a Grid container?', options: ['display: grid', 'display: flex', 'grid: true', 'layout: grid'], correctIndex: 0 },
                    { id: 'c7', text: 'Which property controls the transparency of an element?', options: ['visibility', 'display', 'opacity', 'alpha'], correctIndex: 2 },
                    { id: 'c8', text: 'What is the default position value?', options: ['relative', 'fixed', 'absolute', 'static'], correctIndex: 3 },
                    { id: 'c9', text: 'How do you select an element with id "demo"?', options: ['.demo', '#demo', '*demo', 'demo'], correctIndex: 1 },
                    { id: 'c10', text: 'Which property adds space INSIDE the border?', options: ['margin', 'spacing', 'padding', 'gutter'], correctIndex: 2 }
                ]
            },
            {
                id: 'react-adv',
                name: 'React.js',
                level: 'Advanced',
                questions: [
                    { id: 'r1', text: 'What hook is used for side effects?', options: ['useState', 'useEffect', 'useContext', 'useReducer'], correctIndex: 1 },
                    { id: 'r2', text: 'How do you prevent re-rendering of a child component?', options: ['React.memo', 'useMemo', 'useCallback', 'pure()'], correctIndex: 0 },
                    { id: 'r3', text: 'What is the Virtual DOM?', options: ['A direct copy of the DOM', 'A lightweight copy of the DOM', 'A browser API', 'A database'], correctIndex: 1 },
                    { id: 'r4', text: 'Which hook creates a mutable ref?', options: ['useRef', 'useState', 'useMutable', 'createRef'], correctIndex: 0 },
                    { id: 'r5', text: 'What is the purpose of keys in lists?', options: ['Styling', 'Accessibility', 'Identify changed items', 'Sorting'], correctIndex: 2 },
                    { id: 'r6', text: 'What is Prop Drilling?', options: ['Passing data down deeply', 'Validating props', 'Creating new props', 'Deleting props'], correctIndex: 0 },
                    { id: 'r7', text: 'Which context API method provides the value?', options: ['Provider', 'Consumer', 'Supplier', 'Giver'], correctIndex: 0 },
                    { id: 'r8', text: 'What is a Higher Order Component?', options: ['A function returning a component', 'A parent component', 'A large component', 'A root component'], correctIndex: 0 },
                    { id: 'r9', text: 'What replaces componentDidMount in hooks?', options: ['useEffect(() => {}, [])', 'useEffect(() => {})', 'useMount()', 'useLayoutEffect()'], correctIndex: 0 },
                    { id: 'r10', text: 'How do you optimize expensive calculations?', options: ['React.memo', 'useMemo', 'useEffect', 'useCal'], correctIndex: 1 }
                ]
            }
        ]
    },
    {
        id: 'mobile',
        name: 'Mobile Development',
        icon: 'phone-portrait-outline',
        topics: [
            {
                id: 'rn-basic',
                name: 'React Native Basics',
                level: 'Basic',
                questions: [
                    { id: 'rn1', text: 'Which component renders text?', options: ['<View>', '<Text>', '<Span>', '<p>'], correctIndex: 1 },
                    { id: 'rn2', text: 'What is equivalent to a div?', options: ['<Container>', '<Div>', '<View>', '<Box>'], correctIndex: 2 },
                    { id: 'rn3', text: 'How do you handle taps?', options: ['onClick', 'onTap', 'onPress', 'onTouch'], correctIndex: 2 },
                    { id: 'rn4', text: 'Which component is a scrollable container?', options: ['<ScrollView>', '<Div>', '<View>', '<Scroll>'], correctIndex: 0 },
                    { id: 'rn5', text: 'Does React Native use HTML?', options: ['Yes', 'No', 'Sometimes', 'With plugins'], correctIndex: 1 },
                    { id: 'rn6', text: 'How do you style components?', options: ['CSS files', 'StyleSheet objects', 'SASS', 'XML'], correctIndex: 1 },
                    { id: 'rn7', text: 'What is Flexbox default direction in RN?', options: ['Row', 'Column', 'Grid', 'Block'], correctIndex: 1 },
                    { id: 'rn8', text: 'Which API performs network requests?', options: ['Ajax', 'Fetch', 'Http', 'Net'], correctIndex: 1 },
                    { id: 'rn9', text: 'What is the entry point file?', options: ['index.js or App.js', 'main.html', 'server.js', 'home.js'], correctIndex: 0 },
                    { id: 'rn10', text: 'Can you use standard React hooks?', options: ['Yes', 'No', 'Only specific ones', 'Ideally not'], correctIndex: 0 }
                ]
            },
            {
                id: 'rn-inter',
                name: 'React Native Inter.',
                level: 'Intermediate',
                questions: [
                    { id: 'rni1', text: 'Standard navigation library?', options: ['React Router', 'React Navigation', 'Nav.js', 'RouteNative'], correctIndex: 1 },
                    { id: 'rni2', text: 'What is Expo?', options: ['A convention', 'Framework/Platform for universal React apps', 'A code editor', 'A database'], correctIndex: 1 },
                    { id: 'rni3', text: 'How to persist data locally?', options: ['AsyncStorage', 'LocalStorage', 'Cookies', 'Session'], correctIndex: 0 },
                    { id: 'rni4', text: 'FlatList is better than ScrollView for...', options: ['Small lists', 'Large/Long lists (Lazy loading)', 'Images', 'Static text'], correctIndex: 1 },
                    { id: 'rni5', text: 'What is Fast Refresh?', options: ['Page reload', 'Instant feedback for changes without losing state', 'Clearing cache', 'Restarting server'], correctIndex: 1 },
                    { id: 'rni6', text: 'Platform module is used for...', options: ['Detecting OS (iOS/Android)', 'Building platforms', 'Game design', 'Database connection'], correctIndex: 0 },
                    { id: 'rni7', text: 'SafeAreaView purpose?', options: ['Security', 'Avoid notches/status bars', 'Error handling', 'Saving files'], correctIndex: 1 },
                    { id: 'rni8', text: 'Key difference: CLI vs Expo?', options: ['Expo is native code control', 'CLI gives full native module control', 'No difference', 'CLI is for web only'], correctIndex: 1 },
                    { id: 'rni9', text: 'How to access camera?', options: ['Native modules/Libraries', 'Standard HTML API', 'Not possible', 'Only via cloud'], correctIndex: 0 },
                    { id: 'rni10', text: 'Component lifecycle hook for focus?', options: ['useFocusEffect', 'onFocus', 'didFocus', 'useEffect'], correctIndex: 0 }
                ]
            },
            {
                id: 'flutter-basic',
                name: 'Flutter Basics',
                level: 'Basic',
                questions: [
                    { id: 'f1', text: 'What language does Flutter use?', options: ['Java', 'Swift', 'Dart', 'Kotlin'], correctIndex: 2 },
                    { id: 'f2', text: 'Everything in Flutter is a...', options: ['View', 'Component', 'Widget', 'Module'], correctIndex: 2 },
                    { id: 'f3', text: 'Who developed Flutter?', options: ['Facebook', 'Google', 'Apple', 'Microsoft'], correctIndex: 1 },
                    { id: 'f4', text: 'Which widget is used for layouts?', options: ['Div', 'Container', 'Box', 'Frame'], correctIndex: 1 },
                    { id: 'f5', text: 'What is the command to run the app?', options: ['flutter run', 'flutter start', 'npm start', 'dart run'], correctIndex: 0 },
                    { id: 'f6', text: 'Stateful vs Stateless refers to...', options: ['Data persistence', 'UI mutability', 'Network state', 'App lifecycle'], correctIndex: 1 },
                    { id: 'f7', text: 'What is hot reload?', options: ['Restarting phone', 'Injecting updated code', 'Recompiling entire app', 'Warming up CPU'], correctIndex: 1 },
                    { id: 'f8', text: 'Which file lists dependencies?', options: ['package.json', 'pubspec.yaml', 'build.gradle', 'pom.xml'], correctIndex: 1 },
                    { id: 'f9', text: 'Which function is the app entry point?', options: ['runApp()', 'start()', 'init()', 'main()'], correctIndex: 3 },
                    { id: 'f10', text: 'Does Flutter use native UI components?', options: ['Yes', 'No, it draws its own', 'Only on iOS', 'Only on Android'], correctIndex: 1 }
                ]
            },
            {
                id: 'mobile-adv',
                name: 'Advanced Mobile',
                level: 'Advanced',
                questions: [
                    { id: 'ma1', text: 'What are Native Modules?', options: ['Core components', 'Bridges to native code (Java/Obj-C)', 'Node modules', 'Python scripts'], correctIndex: 1 },
                    { id: 'ma2', text: 'Reduce app size technique?', options: ['ProGuard/Minification', 'Deleting images', 'Zipping apk', 'Removing text'], correctIndex: 0 },
                    { id: 'ma3', text: 'What is Over-The-Air (OTA) update?', options: ['Wi-fi update', 'Updating JS bundle without app store review', 'Bluetooth transfer', 'Cloud sync'], correctIndex: 1 },
                    { id: 'ma4', text: 'Main thread vs JS thread in RN?', options: ['Same thread', 'UI runs on Main, Logic on JS', 'UI runs on JS', 'No threads'], correctIndex: 1 },
                    { id: 'ma5', text: 'Flutter Architecture Layer?', options: ['Framework & Engine', 'HTML & CSS', 'JVM & ART', 'Kernel & Shell'], correctIndex: 0 },
                    { id: 'ma6', text: 'Performance bottleneck in RN?', options: ['Bridge serialization', 'Render speed', 'Memory leak', 'Network'], correctIndex: 0 },
                    { id: 'ma7', text: 'JSI (JavaScript Interface) allows...', options: ['Slower communication', 'Direct synchronous calls between JS and Native', 'Web support', 'Better styling'], correctIndex: 1 },
                    { id: 'ma8', text: 'Hermes Engine is...', options: ['A debugger', 'Optimized JS engine for RN', 'A game engine', 'A layout engine'], correctIndex: 1 },
                    { id: 'ma9', text: 'Tree Shaking?', options: ['Shaking phone', 'Removing unused code during build', 'Refreshing tree view', 'Sorting files'], correctIndex: 1 },
                    { id: 'ma10', text: 'CI/CD for Mobile?', options: ['Jenkins/Fastlane', 'Git/Github', 'Word/Excel', 'Copy/Paste'], correctIndex: 0 }
                ]
            }
        ]
    },
    {
        id: 'languages',
        name: 'Programming Languages',
        icon: 'code-slash-outline',
        topics: [
            {
                id: 'python-basic',
                name: 'Python Basics',
                level: 'Basic',
                questions: [
                    { id: 'p1', text: 'How do you output text?', options: ['echo()', 'write()', 'print()', 'log()'], correctIndex: 2 },
                    { id: 'p2', text: 'Which keyword creates a function?', options: ['func', 'def', 'function', 'create'], correctIndex: 1 },
                    { id: 'p3', text: 'How do you start a comment?', options: ['//', '/*', '#', '<!--'], correctIndex: 2 },
                    { id: 'p4', text: 'Lists are mutable. Tuples are...', options: ['Mutable', 'Immutable', 'Dynamic', 'Text'], correctIndex: 1 },
                    { id: 'p5', text: 'What is the correct file extension?', options: ['.py', '.pt', '.python', '.pi'], correctIndex: 0 },
                    { id: 'p6', text: 'Which operator is for exponentiation?', options: ['^', '**', 'exp', 'pow'], correctIndex: 1 },
                    { id: 'p7', text: 'How do you format a block of code?', options: ['Braces {}', 'Indentation', 'Semicolons', 'Tags'], correctIndex: 1 },
                    { id: 'p8', text: 'Which type is an ordered sequence?', options: ['Set', 'Dictionary', 'List', 'Object'], correctIndex: 2 },
                    { id: 'p9', text: 'Does Python require variable declaration?', options: ['Yes', 'No', 'Only for integers', 'In strict mode'], correctIndex: 1 },
                    { id: 'p10', text: 'What is len() used for?', options: ['Length', 'Linear', 'Lend', 'Loop'], correctIndex: 0 }
                ]
            },
            {
                id: 'python-inter',
                name: 'Python Intermediate',
                level: 'Intermediate',
                questions: [
                    { id: 'pi1', text: 'What is "self" in a class?', options: ['Current instance', 'Global object', 'Parent class', 'System keyword'], correctIndex: 0 },
                    { id: 'pi2', text: 'How to handle errors?', options: ['try-except', 'try-catch', 'if-error', 'do-catch'], correctIndex: 0 },
                    { id: 'pi3', text: 'What is a Decorator?', options: ['CSS style', 'Function modifying another function', 'Class variable', 'Import statement'], correctIndex: 1 },
                    { id: 'pi4', text: 'Which is a keyword argument?', options: ['func(1)', 'func("a")', 'func(x=1)', 'func([1])'], correctIndex: 2 },
                    { id: 'pi5', text: 'What is a Lambda function?', options: ['Anonymous single-line function', 'Large function', 'AWS service', 'Math symbol'], correctIndex: 0 },
                    { id: 'pi6', text: 'What does "pip" do?', options: ['Plays sound', 'Installs packages', 'Compiles code', 'Runs debugger'], correctIndex: 1 },
                    { id: 'pi7', text: 'List Comprehension example?', options: ['[x for x in list]', 'list.map(x)', 'for x in list: x', 'loop(list)'], correctIndex: 0 },
                    { id: 'pi8', text: 'What is __init__?', options: ['Constructor method', 'Destructor', 'Import file', 'Initial variable'], correctIndex: 0 },
                    { id: 'pi9', text: 'Correct way to open a file?', options: ['with open(...) as f:', 'open.file(...)', 'read(...)', 'f = new File()'], correctIndex: 0 },
                    { id: 'pi10', text: 'What is a Generator?', options: ['Power source', 'Function yielding values one by one', 'Random number', 'Code compiler'], correctIndex: 1 }
                ]
            },
            {
                id: 'js-inter',
                name: 'JavaScript',
                level: 'Intermediate',
                questions: [
                    { id: 'j1', text: 'What represents "no value"?', options: ['empty', 'void', 'null', 'nil'], correctIndex: 2 },
                    { id: 'j2', text: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'global', 'dim'], correctIndex: 1 },
                    { id: 'j3', text: 'What is strict equality?', options: ['==', '===', '=', 'equals'], correctIndex: 1 },
                    { id: 'j4', text: 'What is a closure?', options: ['Closing a file', 'Function bundle with lexical environment', 'Ending a loop', 'Object wrapper'], correctIndex: 1 },
                    { id: 'j5', text: 'How do you handle async code?', options: ['Promises/Async-Await', 'Threads', 'Sleep', 'Gotos'], correctIndex: 0 },
                    { id: 'j6', text: 'Type of NaN is...', options: ['String', 'Undefined', 'Number', 'Object'], correctIndex: 2 },
                    { id: 'j7', text: 'Which method adds to array end?', options: ['push()', 'pop()', 'shift()', 'add()'], correctIndex: 0 },
                    { id: 'j8', text: 'What is the DOM?', options: ['Data Object Mode', 'Document Object Model', 'Digital Ordinance', 'Disk Operating Map'], correctIndex: 1 },
                    { id: 'j9', text: 'What is "this" keyword?', options: ['Current function', 'Global object', 'Reference to object context', 'Previous variable'], correctIndex: 2 },
                    { id: 'j10', text: 'Which converts string to integer?', options: ['parseInt()', 'toInteger()', 'String.int()', 'castInt()'], correctIndex: 0 }
                ]
            },
            {
                id: 'js-adv',
                name: 'Advanced JS',
                level: 'Advanced',
                questions: [
                    { id: 'ja1', text: 'What is the Event Loop?', options: ['A for loop', 'Mechanism handling async callbacks', 'Infinite loop', 'DOM event'], correctIndex: 1 },
                    { id: 'ja2', text: 'What does "bind" do?', options: ['Connects internet', 'Creates new function with specific "this"', 'Merges arrays', 'Deletes variables'], correctIndex: 1 },
                    { id: 'ja3', text: 'Prototypal Inheritance means...', options: ['Objects inherit from other objects', 'Classes inherit from classes only', 'Copying code', 'Buying patents'], correctIndex: 0 },
                    { id: 'ja4', text: 'What is Hoisting?', options: ['Lifting heavy weights', 'Moving declarations to top of scope', 'Raising flags', 'Deleting code'], correctIndex: 1 },
                    { id: 'ja5', text: 'Difference: null vs undefined?', options: ['None', 'Null is assignment value, Undefined is type', 'Null is 0', 'Undefined is false'], correctIndex: 1 },
                    { id: 'ja6', text: 'What is Currying?', options: ['Cooking', 'Transforming function to take args sequentially', 'Fast running', 'Mixing arrays'], correctIndex: 1 },
                    { id: 'ja7', text: 'Promise.all() does what?', options: ['Resolves when any promise resolves', 'Resolves when ALL promises resolve', 'Rejects always', 'Runs sequentially'], correctIndex: 1 },
                    { id: 'ja8', text: 'What is a WeakMap?', options: ['Map with weak keys (garbage collectable)', 'Poorly coded map', 'Small map', 'Offline map'], correctIndex: 0 },
                    { id: 'ja9', text: 'Strict Mode puts JS in...', options: ['Restricted operating mode', 'Fast mode', 'Slow mode', 'Dark mode'], correctIndex: 0 },
                    { id: 'ja10', text: 'IIFE stands for...', options: ['Immediately Invoked Function Expression', 'International Internet File Exch', 'If It Fails Else', 'Internal Interface'], correctIndex: 0 }
                ]
            }
        ]
    },
    {
        id: 'ai',
        name: 'Artificial Intelligence',
        icon: 'hardware-chip-outline',
        topics: [
            {
                id: 'ai-basic',
                name: 'AI Concepts',
                level: 'Basic',
                questions: [
                    { id: 'a1', text: 'What does AI stand for?', options: ['Automated Intelligence', 'Artificial Intelligence', 'Advanced Interaction', 'Alien Interface'], correctIndex: 1 },
                    { id: 'a2', text: 'Which is a subset of AI?', options: ['Big Data', 'Machine Learning', 'Cloud Computing', 'IoT'], correctIndex: 1 },
                    { id: 'a3', text: 'Who is the father of AI?', options: ['Alan Turing', 'Elon Musk', 'Bill Gates', 'Steve Jobs'], correctIndex: 0 },
                    { id: 'a4', text: 'What is NLP?', options: ['Natural Language Processing', 'Neural Linear Programming', 'New Learning Protocol', 'Net Log Process'], correctIndex: 0 },
                    { id: 'a5', text: 'What type of learning uses labeled data?', options: ['Unsupervised', 'Supervised', 'Reinforcement', 'Deep'], correctIndex: 1 },
                    { id: 'a6', text: 'Which algorithm mimics the brain?', options: ['Decision Tree', 'Neural Network', 'Regression', 'K-Means'], correctIndex: 1 },
                    { id: 'a7', text: 'What is a Chatbot?', options: ['Hardware robot', 'Software conversation agent', 'Search engine', 'Social network'], correctIndex: 1 },
                    { id: 'a8', text: 'Deep Learning is based on...', options: ['Neural Networks', 'Statistics', 'Logic Gates', 'Hardware'], correctIndex: 0 },
                    { id: 'a9', text: 'Computer Vision deals with...', options: ['Audio', 'Images/Video', 'Text', 'Code'], correctIndex: 1 },
                    { id: 'a10', text: 'What is the Turing Test for?', options: ['Speed', 'Intelligence limit', 'Human-like intelligence', 'Storage capacity'], correctIndex: 2 }
                ]
            },
            {
                id: 'ai-inter',
                name: 'Machine Learning',
                level: 'Intermediate',
                questions: [
                    { id: 'ml1', text: 'Which is a supervised learning algorithm?', options: ['K-Means', 'Linear Regression', 'Apriori', 'PCA'], correctIndex: 1 },
                    { id: 'ml2', text: 'What is Overfitting?', options: ['Model is too simple', 'Model memorizes noise', 'Data is too large', 'Training was too fast'], correctIndex: 1 },
                    { id: 'ml3', text: 'What is a Feature?', options: ['A bug', 'An input variable', 'An output label', 'A software update'], correctIndex: 1 },
                    { id: 'ml4', text: 'Splitting data into...', options: ['Train & Test', 'Good & Bad', 'Real & Fake', 'Old & New'], correctIndex: 0 },
                    { id: 'ml5', text: 'What is a Hyperparameter?', options: ['Model learned parameter', 'Configuration external to model', 'Speed of learning', 'Size of data'], correctIndex: 1 },
                    { id: 'ml6', text: 'Which metric is for classification?', options: ['MSE', 'R-Squared', 'Accuracy', 'MAE'], correctIndex: 2 },
                    { id: 'ml7', text: 'What does SVM stand for?', options: ['Super Vector Machine', 'Support Vector Machine', 'Simple Vector Model', 'System Virtual Memory'], correctIndex: 1 },
                    { id: 'ml8', text: 'What is a Confusion Matrix?', options: ['A puzzle', 'Error visualization table', 'Network graph', 'Random numbers'], correctIndex: 1 },
                    { id: 'ml9', text: 'Unsupervised learning finds...', options: ['Hidden patterns', 'Correct labels', 'Future values', 'Specific answers'], correctIndex: 0 },
                    { id: 'ml10', text: 'Gradient Descent is an...', options: ['Optimization algorithm', 'Sorting method', 'Data structure', 'Encryption type'], correctIndex: 0 }
                ]
            },
            {
                id: 'ai-adv',
                name: 'Deep Learning',
                level: 'Advanced',
                questions: [
                    { id: 'dl1', text: 'Basic unit of a Neural Network?', options: ['Atom', 'Perceptron/Neuron', 'Pixel', 'Bit'], correctIndex: 1 },
                    { id: 'dl2', text: 'What is Backpropagation?', options: ['Backup data', 'Updating weights based on error', 'Reverse engineering', 'Deleting history'], correctIndex: 1 },
                    { id: 'dl3', text: 'What is a CNN used for?', options: ['Text processing', 'Image processing', 'Audio synthesis', 'Database sorting'], correctIndex: 1 },
                    { id: 'dl4', text: 'What is an RNN used for?', options: ['Static images', 'Sequential data/Time series', 'File compression', '3D rendering'], correctIndex: 1 },
                    { id: 'dl5', text: 'Function identifying active neurons?', options: ['Activation Function', 'Trigger Function', 'Start Function', 'Hash Function'], correctIndex: 0 },
                    { id: 'dl6', text: 'Common activation function?', options: ['ReLU', 'Sort', 'Merge', 'Link'], correctIndex: 0 },
                    { id: 'dl7', text: 'What is a Transformer model?', options: ['A car robot', 'Attention-based architecture (NLP)', 'Voltage changer', 'Legacy AI'], correctIndex: 1 },
                    { id: 'dl8', text: 'What is Transfer Learning?', options: ['Copying files', 'Using pre-trained models', 'Teaching students', 'Moving data'], correctIndex: 1 },
                    { id: 'dl9', text: 'What is GAN?', options: ['Global Area Network', 'Generative Adversarial Network', 'General AI Node', 'Google AI Net'], correctIndex: 1 },
                    { id: 'dl10', text: 'Explain "Epoch".', options: ['One pass of full dataset', 'A century', 'A small batch', 'Training error'], correctIndex: 0 }
                ]
            }
        ]
    },
    {
        id: 'cloud',
        name: 'Cloud Computing',
        icon: 'cloud-outline',
        topics: [
            {
                id: 'cloud-basic',
                name: 'Cloud Basics',
                level: 'Basic',
                questions: [
                    { id: 'cl1', text: 'What is AWS?', options: ['Amazon Web Services', 'Apple Web System', 'Advanced Web Solution', 'Auto Web Server'], correctIndex: 0 },
                    { id: 'cl2', text: 'What does SaaS stand for?', options: ['Software as a Service', 'System as a Solution', 'Storage as a Service', 'Server as a Service'], correctIndex: 0 },
                    { id: 'cl3', text: 'Which is NOT a cloud provider?', options: ['Azure', 'GCP', 'AWS', 'Linux'], correctIndex: 3 },
                    { id: 'cl4', text: 'What is Scalability?', options: ['Fixing bugs', 'Handling increased load', 'Reducing cost', 'Changing color'], correctIndex: 1 },
                    { id: 'cl5', text: 'IaaS stands for...', options: ['Internet as a Service', 'Infrastructure as a Service', 'Identity as a Service', 'Image as a Service'], correctIndex: 1 },
                    { id: 'cl6', text: 'What is a Virtual Machine?', options: ['A robot', 'Software simulation of a computer', 'A VR headset', 'A web browser'], correctIndex: 1 },
                    { id: 'cl7', text: 'Which is a storage service in AWS?', options: ['EC2', 'S3', 'Lambda', 'RDS'], correctIndex: 1 },
                    { id: 'cl8', text: 'What is Serverless?', options: ['No servers exist', 'Servers managed by provider', 'Personal server hosting', 'Offline computing'], correctIndex: 1 },
                    { id: 'cl9', text: 'Docker is used for...', options: ['Virtualization', 'Containerization', 'Networking', 'Database'], correctIndex: 1 },
                    { id: 'cl10', text: 'What is Kubernetes?', options: ['A game', 'Container Orchestration', 'A database', 'A coding language'], correctIndex: 1 }
                ]
            },
            {
                id: 'cloud-inter',
                name: 'Cloud Services',
                level: 'Intermediate',
                questions: [
                    { id: 'cli1', text: 'What is a Load Balancer?', options: ['Weighs servers', 'Distributes incoming traffic', 'Calculates cost', 'Compresses files'], correctIndex: 1 },
                    { id: 'cli2', text: 'What is Object Storage (S3)?', options: ['Database for text', 'Block storage for OS', 'Flat storage for files/blobs', 'Cache memory'], correctIndex: 2 },
                    { id: 'cli3', text: 'What is a region?', options: ['A map area', 'Physical location of data centers', 'Time zone', 'Language setting'], correctIndex: 1 },
                    { id: 'cli4', text: 'What is Auto-Scaling?', options: ['Zooming images', 'Auto-adjust boundaries', 'Auto-add/remove resources', 'Auto-save files'], correctIndex: 2 },
                    { id: 'cli5', text: 'Which is a NoSQL cloud DB?', options: ['DynamoDB', 'MySQL', 'PostgreSQL', 'Oracle'], correctIndex: 0 },
                    { id: 'cli6', text: 'What is CDN?', options: ['Code Delivery Node', 'Content Delivery Network', 'Cloud Data Net', 'Central Domain Name'], correctIndex: 1 },
                    { id: 'cli7', text: 'What is Latency?', options: ['Bandwidth speed', 'Delay in data transfer', 'Server uptime', 'Cost per hour'], correctIndex: 1 },
                    { id: 'cli8', text: 'What is VPC?', options: ['Virtual Private Cloud', 'Very Public Cloud', 'Video Processing Card', 'Virtual PC'], correctIndex: 0 },
                    { id: 'cli9', text: 'Lambda is event-driven...', options: ['Storage', 'Compute', 'Networking', 'Security'], correctIndex: 1 },
                    { id: 'cli10', text: 'Benefit of Microservices?', options: ['Tightly coupled', 'Monolithic', 'Independent scaling/deploying', 'Single failure point'], correctIndex: 2 }
                ]
            },
            {
                id: 'cloud-adv',
                name: 'Cloud Architecture',
                level: 'Advanced',
                questions: [
                    { id: 'cla1', text: 'What ensures high availability?', options: ['Single zone', 'Multi-AZ deployment', 'Larger instance', 'Tape backup'], correctIndex: 1 },
                    { id: 'cla2', text: 'Principle of "Least Privilege"?', options: ['Give admin to everyone', 'Give minimum necessary access', 'No password needed', 'Guest access only'], correctIndex: 1 },
                    { id: 'cla3', text: 'Blue/Green Deployment?', options: ['Coloring screens', 'Switching traffic between 2 envs', 'Recycling servers', 'Solar power'], correctIndex: 1 },
                    { id: 'cla4', text: 'What is Infrastructure as Code?', options: ['Building servers by hand', 'Managing infra via config files', 'Writing code on servers', 'Commenting code'], correctIndex: 1 },
                    { id: 'cla5', text: 'Severless limitation?', options: ['No scaling', 'Cold starts', 'High maintenance', 'Can\'t run code'], correctIndex: 1 },
                    { id: 'cla6', text: 'What is Edge Computing?', options: ['Computing at data center', 'Computing near data source', 'Computing in space', 'Old computers'], correctIndex: 1 },
                    { id: 'cla7', text: 'Hybrid Cloud strategy?', options: ['Public + Private Cloud', 'AWS + Azure', 'Cloud + Rain', 'Laptop + Phone'], correctIndex: 0 },
                    { id: 'cla8', text: 'Disaster Recovery RTO?', options: ['Real Time Option', 'Recovery Time Objective', 'Run Time Output', 'Return To Origin'], correctIndex: 1 },
                    { id: 'cla9', text: 'What is a Service Mesh?', options: ['Wi-Fi extender', 'Microservices communication layer', 'cable organizer', 'VPN type'], correctIndex: 1 },
                    { id: 'cla10', text: 'Five Pillars of Well-Architected?', options: ['Fast, Cheap, Good', 'Ops, Security, Reliability, Perf, Cost', 'Code, Test, Deploy', 'Input, Process, Output'], correctIndex: 1 }
                ]
            }
        ]
    },
    {
        id: 'cybersecurity',
        name: 'Cybersecurity',
        icon: 'shield-checkmark-outline',
        topics: [
            {
                id: 'cyber-basic',
                name: 'Security Basics',
                level: 'Basic',
                questions: [
                    { id: 'cs1', text: 'What does CIA stand for in security?', options: ['Central Intelligence Agency', 'Confidentiality, Integrity, Availability', 'Computer Internet Access', 'Control Internal Audit'], correctIndex: 1 },
                    { id: 'cs2', text: 'What is Phishing?', options: ['Catching fish', 'Fraudulent emails to steal info', 'Testing network speed', 'Deleting files'], correctIndex: 1 },
                    { id: 'cs3', text: 'Which is a strong password?', options: ['password123', 'admin', 'Tr0ub4dor&3', '12345678'], correctIndex: 2 },
                    { id: 'cs4', text: 'What is a Firewall?', options: ['A physical wall', 'Network security system', 'Antivirus software', 'A virus'], correctIndex: 1 },
                    { id: 'cs5', text: 'What is Malware?', options: ['Malicious Software', 'Hardware malfunction', 'Bad email', 'Slow internet'], correctIndex: 0 },
                    { id: 'cs6', text: 'What does VPN stand for?', options: ['Virtual Public Network', 'Very Private Network', 'Virtual Private Network', 'Visual Protocol Node'], correctIndex: 2 },
                    { id: 'cs7', text: 'What is 2FA?', options: ['2 Fast Apps', 'Two-Factor Authentication', 'Double Fire Antivirus', 'To For All'], correctIndex: 1 },
                    { id: 'cs8', text: 'What is a DDoS attack?', options: ['Direct Denial of Service', 'Distributed Denial of Service', 'Digital Data Server', 'Domain Disk System'], correctIndex: 1 },
                    { id: 'cs9', text: 'Encryption turns data into...', options: ['Plain text', 'Cipher text', 'Binary', 'Images'], correctIndex: 1 },
                    { id: 'cs10', text: 'Who is a "White Hat" hacker?', options: ['Ethical hacker', 'Criminal hacker', 'Government agent', 'Novice hacker'], correctIndex: 0 }
                ]
            },
            {
                id: 'cyber-inter',
                name: 'Network Security',
                level: 'Intermediate',
                questions: [
                    { id: 'csi1', text: 'What is HTTPS?', options: ['Hyper Text Plain Setup', 'HTTP Secure (Encrypted)', 'High Transfer Speed', 'HTML Protocol'], correctIndex: 1 },
                    { id: 'csi2', text: 'What is a VPN Tunnel?', options: ['Underground cable', 'Encrypted connection over public net', 'Virus protection', 'Secret browser'], correctIndex: 1 },
                    { id: 'csi3', text: 'Which protocol is insecure?', options: ['SSH', 'Telnet', 'HTTPS', 'SFTP'], correctIndex: 1 },
                    { id: 'csi4', text: 'What is SQL Injection?', options: ['Formatting database', 'Inserting malicious SQL code', 'Speeding up queries', 'Installing SQL'], correctIndex: 1 },
                    { id: 'csi5', text: 'What does IDS stand for?', options: ['Intrusion Detection System', 'Internet Data Security', 'Internal Disk Saver', 'Identity Service'], correctIndex: 0 },
                    { id: 'csi6', text: 'What is a Zero Day exploit?', options: ['No damage exploit', 'Exploit known for 0 days (new)', 'Expired exploit', 'Free exploit'], correctIndex: 1 },
                    { id: 'csi7', text: 'Man-in-the-Middle attack?', options: ['Interceptor between two parties', 'Center server attack', 'User error', 'Admin abuse'], correctIndex: 0 },
                    { id: 'csi8', text: 'XSS stands for...', options: ['Extra Secure Socket', 'Cross-Site Scripting', 'XML Security Std', 'X-ray Scans'], correctIndex: 1 },
                    { id: 'csi9', text: 'What is Social Engineering?', options: ['Building bridges', 'Manipulating people for info', 'Coding social apps', 'Hiring teams'], correctIndex: 1 },
                    { id: 'csi10', text: 'Public Key vs Private Key?', options: ['Same key', 'Asymmetric Encryption', 'Symmetric Encryption', 'No encryption'], correctIndex: 1 }
                ]
            },
            {
                id: 'cyber-adv',
                name: 'Ethical Hacking',
                level: 'Advanced',
                questions: [
                    { id: 'csa1', text: 'What is Penetration Testing?', options: ['Pen writing test', 'Authorized simulated cyberattack', 'Breaking hardware', 'Testing internet speed'], correctIndex: 1 },
                    { id: 'csa2', text: 'Tool for packet sniffing?', options: ['Wireshark', 'Notepad', 'Excel', 'Calculator'], correctIndex: 0 },
                    { id: 'csa3', text: 'Metasploit is...', options: ['A game', 'Penetration testing framework', 'A virus', 'A chat app'], correctIndex: 1 },
                    { id: 'csa4', text: 'What is a Honeypot?', options: ['Sweet food', 'Decoy system to trap hackers', 'Secure vault', 'Password manager'], correctIndex: 1 },
                    { id: 'csa5', text: 'Red Team vs Blue Team?', options: ['Attackers vs Defenders', 'Admin vs Users', 'Dev vs Ops', 'Sales vs Marketing'], correctIndex: 0 },
                    { id: 'csa6', text: 'What is Steganography?', options: ['Hiding data within files (images)', 'Writing shorthand', 'Encrypting drives', 'Password hashing'], correctIndex: 0 },
                    { id: 'csa7', text: 'Buffer Overflow?', options: ['Too much water', 'Writing more data than buffer holds', 'Fast download', 'Screen glitch'], correctIndex: 1 },
                    { id: 'csa8', text: 'Rootkit?', options: ['Gardening tool', 'Malware hiding deep in OS', 'Admin password', 'File explorer'], correctIndex: 1 },
                    { id: 'csa9', text: 'Air-gapped computer?', options: ['Wireless logic', 'Physically isolated from network', 'Fan cooled', 'Cloud connected'], correctIndex: 1 },
                    { id: 'csa10', text: 'Ransomware?', options: ['Free software', 'Encrypts files & demands payment', 'Adware', 'Trial version'], correctIndex: 1 }
                ]
            }
        ]
    },
    {
        id: 'datascience',
        name: 'Data Science',
        icon: 'bar-chart-outline',
        topics: [
            {
                id: 'ds-basic',
                name: 'Data Analysis',
                level: 'Basic',
                questions: [
                    { id: 'ds1', text: 'Which language is popular for Data Science?', options: ['C++', 'Python', 'Java', 'Swift'], correctIndex: 1 },
                    { id: 'ds2', text: 'What is a DataFrame?', options: ['Video frame', '2D labeled data structure', 'Database table', 'Image file'], correctIndex: 1 },
                    { id: 'ds3', text: 'What library is used for plotting in Python?', options: ['NumPy', 'Pandas', 'Matplotlib', 'Requests'], correctIndex: 2 },
                    { id: 'ds4', text: 'What does CSV stand for?', options: ['Computer System Video', 'Comma Separated Values', 'Code Syntax Value', 'Common Sheet Version'], correctIndex: 1 },
                    { id: 'ds5', text: 'What is Data Cleaning?', options: ['Deleting all data', 'Fixing errors/missing values', 'Formatting hard drive', 'Organizing folders'], correctIndex: 1 },
                    { id: 'ds6', text: 'Mean, Median, Mode are measures of...', options: ['Dispersion', 'Central Tendency', 'Variance', 'Probability'], correctIndex: 1 },
                    { id: 'ds7', text: 'Which is a Big Data technology?', options: ['Hadoop', 'Excel', 'Word', 'Notepad'], correctIndex: 0 },
                    { id: 'ds8', text: 'What is SQL used for?', options: ['Styling web pages', 'Querying databases', 'Machine Learning', 'Networking'], correctIndex: 1 },
                    { id: 'ds9', text: 'What is a Null value?', options: ['Zero', 'Missing/Undefined', 'False', 'Negative'], correctIndex: 1 },
                    { id: 'ds10', text: 'Pandas is built on top of...', options: ['React', 'NumPy', 'Flask', 'Django'], correctIndex: 1 }
                ]
            },
            {
                id: 'ds-inter',
                name: 'Statistics & Wrangling',
                level: 'Intermediate',
                questions: [
                    { id: 'dsi1', text: 'What is Standard Deviation?', options: ['Average value', 'Measure of spread/dispersion', 'Sum of values', 'Error rate'], correctIndex: 1 },
                    { id: 'dsi2', text: 'What is a Normal Distribution?', options: ['Bell curve', 'Flat line', 'Random points', 'Circle'], correctIndex: 0 },
                    { id: 'dsi3', text: 'Merging two DataFrames with common key?', options: ['Concatenate', 'Join/Merge', 'Append', 'Split'], correctIndex: 1 },
                    { id: 'dsi4', text: 'A/B Testing compared...', options: ['Two versions of a variable', 'All variables', 'No variables', 'Hardware speed'], correctIndex: 0 },
                    { id: 'dsi5', text: 'What is an "Outlier"?', options: ['A great file', 'Data point significantly different from others', 'Missing data', 'Average data'], correctIndex: 1 },
                    { id: 'dsi6', text: 'P-value < 0.05 usually means...', options: ['Result is statistically significant', 'Result is random', 'Error in code', 'Data is null'], correctIndex: 0 },
                    { id: 'dsi7', text: 'What is Exploratory Data Analysis (EDA)?', options: ['Deleting data', 'Analyzing data sets to summarize characteristics', 'Writing final report', 'Installing Python'], correctIndex: 1 },
                    { id: 'dsi8', text: 'What is Correlation?', options: ['Causation', 'Statistical relationship between variables', 'Data size', 'Error type'], correctIndex: 1 },
                    { id: 'dsi9', text: 'One-Hot Encoding converts...', options: ['Categorical to Numerical', 'Numerical to Text', 'Images to Audio', 'Files to Folders'], correctIndex: 0 },
                    { id: 'dsi10', text: 'What is "Sampling"?', options: ['Playing music', 'Selecting a subset of individuals from a population', 'Copying files', 'Deleting rows'], correctIndex: 1 }
                ]
            },
            {
                id: 'ds-adv',
                name: 'Big Data & Pipelines',
                level: 'Advanced',
                questions: [
                    { id: 'dsa1', text: 'MapReduce consists of...', options: ['Map & Reduce phases', 'Copy & Paste', 'Read & Write', 'Start & Stop'], correctIndex: 0 },
                    { id: 'dsa2', text: 'What is Apache Spark?', options: ['A browser', 'Unified analytics engine for big data', 'A database', 'A firewall'], correctIndex: 1 },
                    { id: 'dsa3', text: 'ETL stands for...', options: ['Extract, Transform, Load', 'Edit, Type, List', 'Enter, Test, Log', 'Easy Text Language'], correctIndex: 0 },
                    { id: 'dsa4', text: 'What is a Data Lake?', options: ['Water cooling', 'Centralized repository for structured & unstructured data', 'Database table', 'Cloud storage'], correctIndex: 1 },
                    { id: 'dsa5', text: 'What is dimensionality reduction (PCA)?', options: ['Deleting data', 'Reducing number of variables while keeping info', 'Zipping files', 'Lowering screen brightness'], correctIndex: 1 },
                    { id: 'dsa6', text: 'Batch Processing vs Stream Processing?', options: ['Slow vs Fast', 'Processing large blocks vs Real-time data', 'Offline vs Online', 'Old vs New'], correctIndex: 1 },
                    { id: 'dsa7', text: 'What is Apache Kafka used for?', options: ['Sending emails', 'Building pipelines & streaming apps', 'Writing docs', 'Hosting webs'], correctIndex: 1 },
                    { id: 'dsa8', text: 'NoSQL CAP Theorem refers to...', options: ['Consistency, Availability, Partition Tolerance', 'Cost, Access, Power', 'Code, App, Program', 'Cloud, AI, Python'], correctIndex: 0 },
                    { id: 'dsa9', text: 'What is a Data Warehouse?', options: ['Amazon warehouse', 'System for reporting and data analysis', 'Garage for servers', 'Backup drive'], correctIndex: 1 },
                    { id: 'dsa10', text: 'Bias-Variance Tradeoff?', options: ['Cost vs Speed', 'Model error from wrong assumptions vs sensitivity to noise', 'Hard vs Soft', 'Big vs Small'], correctIndex: 1 }
                ]
            }
        ]
    },
    {
        id: 'devops',
        name: 'DevOps',
        icon: 'infinite-outline',
        topics: [
            {
                id: 'devops-basic',
                name: 'DevOps Culture',
                level: 'Basic',
                questions: [
                    { id: 'do1', text: 'DevOps combines...', options: ['Marketing & Sales', 'Development & Operations', 'HR & Finance', 'Design & Code'], correctIndex: 1 },
                    { id: 'do2', text: 'What is CI?', options: ['Continuous Integration', 'Code Intelligence', 'Cloud Interface', 'Central Initializer'], correctIndex: 0 },
                    { id: 'do3', text: 'What is CD?', options: ['Compact Disc', 'Continuous Delivery/Deployment', 'Code Debugging', 'Cloud Data'], correctIndex: 1 },
                    { id: 'do4', text: 'What tool is famous for CI/CD?', options: ['Jenkins', 'Photoshop', 'Word', 'Excel'], correctIndex: 0 },
                    { id: 'do5', text: 'Infrastructure as Code (IaC) tool?', options: ['Terraform', 'Paint', 'Slack', 'Zoom'], correctIndex: 0 },
                    { id: 'do6', text: 'What is a "Container"?', options: ['Storage box', 'Isolated app environment', 'Virtual Machine', 'A folder'], correctIndex: 1 },
                    { id: 'do7', text: 'Git is a system for...', options: ['Version Control', 'Database', 'Operating System', 'Email'], correctIndex: 0 },
                    { id: 'do8', text: 'Monitoring tool?', options: ['Prometheus', 'Notepad', 'Calculator', 'Camera'], correctIndex: 0 },
                    { id: 'do9', text: 'Goal of DevOps?', options: ['Slower releases', 'Manual work', 'Faster/Reliable delivery', 'Separate teams'], correctIndex: 2 },
                    { id: 'do10', text: 'What is a Pipeline?', options: ['Physical pipe', 'Automated workflow', 'Network cable', 'Sales funnel'], correctIndex: 1 }
                ]
            },
            {
                id: 'devops-inter',
                name: 'Container Orchestration',
                level: 'Intermediate',
                questions: [
                    { id: 'doi1', text: 'Smallest deployable unit in K8s?', options: ['Pod', 'Container', 'Node', 'Cluster'], correctIndex: 0 },
                    { id: 'doi2', text: 'What is Helm?', options: ['A ship part', 'Package manager for Kubernetes', 'Monitoring tool', 'Database'], correctIndex: 1 },
                    { id: 'doi3', text: 'Docker Compose is for...', options: ['Single container', 'Multi-container applications', 'Cloud hosting', 'Writing code'], correctIndex: 1 },
                    { id: 'doi4', text: 'What is a K8s Service?', options: ['Customer support', 'Abstraction to expose Pods as network service', 'A payment', 'A server'], correctIndex: 1 },
                    { id: 'doi5', text: 'What is a DaemonSet?', options: ['Evil spirit', 'Runs a copy of a pod on every node', 'Background music', 'Database backup'], correctIndex: 1 },
                    { id: 'doi6', text: 'Kubectl is...', options: ['A game', 'Command line tool for K8s', 'A virus', 'A cloud provider'], correctIndex: 1 },
                    { id: 'doi7', text: 'What is a Namespace?', options: ['Naming convention', 'Virtual cluster isolation', 'Space exploration', 'File extension'], correctIndex: 1 },
                    { id: 'doi8', text: 'What is a ConfigMap?', options: ['A map image', 'Decouples config artifacts from image content', 'Google Maps', 'System settings'], correctIndex: 1 },
                    { id: 'doi9', text: 'Rolling Update means...', options: ['Updating all at once', 'Updates with zero downtime', 'Deleting everything', 'Manual update'], correctIndex: 1 },
                    { id: 'doi10', text: 'What replaces Docker Desktop?', options: ['Podman', 'Notepad', 'Excel', 'Chrome'], correctIndex: 0 }
                ]
            },
            {
                id: 'devops-adv',
                name: 'SRE & Observability',
                level: 'Advanced',
                questions: [
                    { id: 'doa1', text: 'What is SRE?', options: ['Site Reliability Engineering', 'System Reboot Engine', 'Software Rare Error', 'Server Root Environment'], correctIndex: 0 },
                    { id: 'doa2', text: 'What is SLO?', options: ['Slow Loris Option', 'Service Level Objective', 'System Log Output', 'Server Load Origin'], correctIndex: 1 },
                    { id: 'doa3', text: 'What is an Error Budget?', options: ['Money for bugs', 'Allowed amount of unreliability', 'Failed payments', 'Server cost'], correctIndex: 1 },
                    { id: 'doa4', text: 'Observability Pillars?', options: ['Logs, Metrics, Traces', 'Code, Test, Deploy', 'Input, Process, Output', 'Time, Cost, Quality'], correctIndex: 0 },
                    { id: 'doa5', text: 'Chaos Engineering?', options: ['Creating confusion', 'Experimenting to ensure system withstands turbulence', 'Poor coding', 'Hacking'], correctIndex: 1 },
                    { id: 'doa6', text: 'What is Feature Toggling?', options: ['Switching monitors', 'Enabling/Disabling features without redeploy', 'Deleting code', 'Changing colors'], correctIndex: 1 },
                    { id: 'doa7', text: 'What is "Toil"?', options: ['Hard work', 'Manual, repetitive, automatable work', 'Coding new features', 'System design'], correctIndex: 1 },
                    { id: 'doa8', text: 'Grafana is used for...', options: ['Writing code', 'Visualization/Dashboards', 'Sending emails', 'Hosting videos'], correctIndex: 1 },
                    { id: 'doa9', text: 'Distributed Tracing helps...', options: ['Track requests across microservices', 'Trace paper', 'Find ip address', 'Hack wifi'], correctIndex: 0 },
                    { id: 'doa10', text: 'What is a Blameless Post-Mortem?', options: ['Ignoring errors', 'Analysis of incident without blaming individuals', 'Medical exam', 'Firing employees'], correctIndex: 1 }
                ]
            }
        ]
    },
    {
        id: 'blockchain',
        name: 'Blockchain',
        icon: 'link-outline',
        topics: [
            {
                id: 'bc-basic',
                name: 'Crypto Basics',
                level: 'Basic',
                questions: [
                    { id: 'bc1', text: 'What is a Blockchain?', options: ['Centralized database', 'Distributed Ledger', 'Bank vault', 'Social Network'], correctIndex: 1 },
                    { id: 'bc2', text: 'Who created Bitcoin?', options: ['Elon Musk', 'Satoshi Nakamoto', 'Vitalik Buterin', 'Bill Gates'], correctIndex: 1 },
                    { id: 'bc3', text: 'What is a Smart Contract?', options: ['Legal paper', 'Self-executing code on chain', 'A phone contract', 'AI lawyer'], correctIndex: 1 },
                    { id: 'bc4', text: 'Ethereum allows...', options: ['Only payments', 'Smart Contracts & DApps', 'Free internet', 'Video streaming'], correctIndex: 1 },
                    { id: 'bc5', text: 'What is Mining?', options: ['Digging earth', 'Validating transactions', 'Hacking', 'Creating hardware'], correctIndex: 1 },
                    { id: 'bc6', text: 'What is a Wallet?', options: ['Leather pocket', 'Stores private keys', 'Bank account', 'ID card'], correctIndex: 1 },
                    { id: 'bc7', text: 'What does "DeFi" stand for?', options: ['Design Finance', 'Decentralized Finance', 'Digital Fine', 'Data Files'], correctIndex: 1 },
                    { id: 'bc8', text: 'What is an NFT?', options: ['No Free Tokens', 'Non-Fungible Token', 'New File Type', 'Network Fast Transfer'], correctIndex: 1 },
                    { id: 'bc9', text: 'Consensus mechanism for Bitcoin?', options: ['Proof of Stake', 'Proof of Work', 'Proof of History', 'Proof of Authority'], correctIndex: 1 },
                    { id: 'bc10', text: 'Are blockchain transactions reversible?', options: ['Yes, easily', 'No, typically immutable', 'Only by banks', 'If you ask nicely'], correctIndex: 1 }
                ]
            },
            {
                id: 'bc-inter',
                name: 'Smart Contracts',
                level: 'Intermediate',
                questions: [
                    { id: 'bci1', text: 'Major language for Ethereum contracts?', options: ['Python', 'Solidity', 'C++', 'Java'], correctIndex: 1 },
                    { id: 'bci2', text: 'What is Gas?', options: ['Fuel', 'Fee for transaction execution', 'Air', 'Token name'], correctIndex: 1 },
                    { id: 'bci3', text: 'What is EVM?', options: ['Electronic Voting Machine', 'Ethereum Virtual Machine', 'Extra Virtual Memory', 'Energy Value Meter'], correctIndex: 1 },
                    { id: 'bci4', text: 'What is a DApp?', options: ['Desktop App', 'Decentralized Application', 'Digital App', 'Developer App'], correctIndex: 1 },
                    { id: 'bci5', text: 'What is an Oracle?', options: ['A database', 'Bridge between blockchain and real-world data', 'A prophet', 'A bank'], correctIndex: 1 },
                    { id: 'bci6', text: 'Standard for tokens on Ethereum?', options: ['ERC-20', 'ISO-9001', 'HTTP', 'TCP/IP'], correctIndex: 0 },
                    { id: 'bci7', text: 'Standard for NFTs?', options: ['ERC-20', 'ERC-721', 'ERC-1155', 'ERC-404'], correctIndex: 1 },
                    { id: 'bci8', text: 'What is a DAO?', options: ['Decentralized Autonomous Organization', 'Digital Asset Owner', 'Data Access Object', 'Design Art Object'], correctIndex: 0 },
                    { id: 'bci9', text: 'Function modifier "payable" means...', options: ['Function costs money to call', 'Function can receive Ether', 'Function pays the user', 'Function is free'], correctIndex: 1 },
                    { id: 'bci10', text: 'Where are contract logs stored?', options: ['In memory', 'On blockchain (Logs/Events)', 'In a file', 'Nowhere'], correctIndex: 1 }
                ]
            },
            {
                id: 'bc-adv',
                name: 'Blockchain Architecture',
                level: 'Advanced',
                questions: [
                    { id: 'bca1', text: 'What data structure connects blocks?', options: ['Linked List', 'Merkle Tree / Hash pointers', 'Array', 'Graph'], correctIndex: 1 },
                    { id: 'bca2', text: 'What is a Hard Fork?', options: ['A spoon', 'Non-backward compatible protocol change', 'Soft update', 'Copying code'], correctIndex: 1 },
                    { id: 'bca3', text: 'What is the "Nonce" in POW?', options: ['Random number used to find hash target', 'Block ID', 'Timestamp', 'Coin name'], correctIndex: 0 },
                    { id: 'bca4', text: 'What is a 51% Attack?', options: ['Majority control of hashrate', 'Price crashing 51%', 'Hacking 51% of nodes', 'Deleting 51% data'], correctIndex: 0 },
                    { id: 'bca5', text: 'Benefits of Layer 2?', options: ['Slower', 'Scalability & Lower fees', 'More centralization', 'No security'], correctIndex: 1 },
                    { id: 'bca6', text: 'What are ZK-Rollups?', options: ['Delicious food', 'Zero-Knowledge proof scaling solution', 'Data compression', 'New token'], correctIndex: 1 },
                    { id: 'bca7', text: 'Byzantine Generals Problem?', options: ['Historical war', 'Consensus in distributed systems with traitors', 'Coding error', 'Hardware failure'], correctIndex: 1 },
                    { id: 'bca8', text: 'What is Sharding?', options: ['Sharing keys', 'Partitioning blockchain state', 'Breaking hardware', 'Merging chains'], correctIndex: 1 },
                    { id: 'bca9', text: 'Sybil Attack?', options: ['Physical attack', 'One actor controlling many fake identities', 'Network lag', 'Server crash'], correctIndex: 1 },
                    { id: 'bca10', text: 'IPFS is used for?', options: ['Payments', 'Decentralized File Storage', 'Video calling', 'Emailing'], correctIndex: 1 }
                ]
            }
        ]
    },
    {
        id: 'uiux',
        name: 'UI/UX Design',
        icon: 'color-palette-outline',
        topics: [
            {
                id: 'ui-basic',
                name: 'Design Principles',
                level: 'Basic',
                questions: [
                    { id: 'ui1', text: 'What is UX?', options: ['User Xenophobia', 'User Experience', 'Unity Xylophone', 'Under X-ray'], correctIndex: 1 },
                    { id: 'ui2', text: 'What is UI?', options: ['User Interface', 'Under Internet', 'United Intelligence', 'User Info'], correctIndex: 0 },
                    { id: 'ui3', text: 'Popular UI design tool?', options: ['Excel', 'Figma', 'Notepad', 'VLC'], correctIndex: 1 },
                    { id: 'ui4', text: 'What is White Space?', options: ['Empty space for breathing room', 'Wasted space', 'White color only', 'Background image'], correctIndex: 0 },
                    { id: 'ui5', text: 'What is Wireframing?', options: ['Making cables', 'Low-fidelity layout sketch', 'Writing code', '3D modeling'], correctIndex: 1 },
                    { id: 'ui6', text: 'Color theory: Red usually implies...', options: ['Success', 'Error/Danger', 'Peace', 'Trust'], correctIndex: 1 },
                    { id: 'ui7', text: 'Contrast is important for...', options: ['Readability/Accessibility', 'Hiding text', 'Speed', 'Sound'], correctIndex: 0 },
                    { id: 'ui8', text: 'What is a Persona?', options: ['A mask', 'Fictional user representation', 'The designer', 'The CEO'], correctIndex: 1 },
                    { id: 'ui9', text: 'Mobile-first design means...', options: ['Designing for desktop first', 'Designing for mobile screens first', 'Only mobile app', 'No design'], correctIndex: 1 },
                    { id: 'ui10', text: 'Typography refers to...', options: ['Maps', 'Type of computers', 'Style/Appearance of text', 'Typos'], correctIndex: 2 }
                ]
            },
            {
                id: 'ui-inter',
                name: 'UX Research',
                level: 'Intermediate',
                questions: [
                    { id: 'uii1', text: 'What is User Flow?', options: ['Traffic jam', 'Path taken by user to complete a task', 'Internet speed', 'Coding logic'], correctIndex: 1 },
                    { id: 'uii2', text: 'What is Card Sorting used for?', options: ['Gambling', 'Information Architecture / Categorization', 'Magic tricks', 'Hardware sorting'], correctIndex: 1 },
                    { id: 'uii3', text: 'Low-Fidelity vs High-Fidelity?', options: ['Sound quality', 'Detail level in prototypes', 'Screen resolution', 'Internet connection'], correctIndex: 1 },
                    { id: 'uii4', text: 'What is Usability Testing?', options: ['Testing code bugs', 'Observing users interacting with product', 'Checking server uptime', 'Testing hardware'], correctIndex: 1 },
                    { id: 'uii5', text: 'What is a Mockup?', options: ['A joke', 'Visual representation of final design', 'A wireframe', 'A code snippet'], correctIndex: 1 },
                    { id: 'uii6', text: 'Rule of Thirds is from...', options: ['Coding', 'Photography/Composition', 'Music', 'Cooking'], correctIndex: 1 },
                    { id: 'uii7', text: 'What is Affordance?', options: ['Cost of product', 'Visual clue on how to use an object', 'Discount', 'Payment method'], correctIndex: 1 },
                    { id: 'uii8', text: 'What is A/B Testing in Design?', options: ['Comparing two design variations', 'Testing alphabet', 'Color testing', 'None'], correctIndex: 0 },
                    { id: 'uii9', text: 'What is a Prototype?', options: ['Final product', 'Interactive simulation of design', 'Paper sketch', 'Database model'], correctIndex: 1 },
                    { id: 'uii10', text: 'Gestalt Principles explain...', options: ['How humans perceive visual patterns', 'Coding syntax', 'Color mixing', 'History of art'], correctIndex: 0 }
                ]
            },
            {
                id: 'ui-adv',
                name: 'Systems & Accessibility',
                level: 'Advanced',
                questions: [
                    { id: 'uia1', text: 'What is a Design System?', options: ['A computer', 'Collection of reusable components & standards', 'Photoshop file', 'Operating System'], correctIndex: 1 },
                    { id: 'uia2', text: 'What is Atomic Design?', options: ['Nuclear science', 'Methodology: Atoms > Molecules > Organisms', 'Small design', 'Explosive colors'], correctIndex: 1 },
                    { id: 'uia3', text: 'What is WCAG?', options: ['Web Content Accessibility Guidelines', 'World Computer Association Group', 'Web Coding And Graphics', 'Wireless Connection Access Gateway'], correctIndex: 0 },
                    { id: 'uia4', text: 'What are Design Tokens?', options: ['Crypto coins', 'Variables for design values (colors, spacing)', 'Bus tickets', 'Login keys'], correctIndex: 1 },
                    { id: 'uia5', text: 'Heuristic Evaluation?', options: ['User testing', 'Expert review against usability principles', 'Automated testing', 'Hardware check'], correctIndex: 1 },
                    { id: 'uia6', text: 'What is "Dark Pattern"?', options: ['Night mode', 'Deceptive UI designed to trick users', 'Black background', 'Shadow effect'], correctIndex: 1 },
                    { id: 'uia7', text: 'Fitts\'s Law relates to...', options: ['Exercise', 'Time to acquire a target (size & distance)', 'Fitting text in box', 'Color contrast'], correctIndex: 1 },
                    { id: 'uia8', text: 'Hick\'s Law states...', options: ['More choices = longer decision time', 'Less is more', 'Design for mobile', 'Red is better'], correctIndex: 0 },
                    { id: 'uia9', text: 'Accessibility (a11y) benefits...', options: ['Only disabled users', 'Everyone (including situational limitations)', 'Only elderly', 'No one'], correctIndex: 1 },
                    { id: 'uia10', text: 'What is Cognitive Load?', options: ['Server load', 'Mental effort required to use interface', 'Weight of computer', 'Internet bandwidth'], correctIndex: 1 }
                ]
            }
        ]
    }
];
