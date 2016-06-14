#Sketch file can be downloaded here: https://dribbble.com/shots/2548398-Wallet-Concept-Sketch-Principle-Freebie

# Import file "cards_app_sketch2" (sizes and positions are scaled 1:2)
$ = Framer.Importer.load("imported/cards_app_sketch2@2x")

$.placeholder_1.opacity = 0
$.placeholder_2.opacity = 0

$.card_2.x = 720
$.card_2.y = 190
$.card_2.scale = 0.85
$.card_2.originX = 0
$.card_2.originY = 0

$.card_3.x = 1120
$.card_3.y = 190
$.card_3.scale = 0.85
$.card_3.originX = 0
$.card_3.originY = 0

# Add states
$.card_1.states.add
	two: x: -590, y: 190, scale: 0.85, originX: 1, originY: 0
	three: x: -1200, y: 190, scale: 0.85, originX: 1, originY: 0
$.card_1.states.animationOptions = curve: 'spring(200, 20, 0)'

$.card_2.states.add
	two: scale: 1, x: 66, y: 160, originX: 0, originY: 0
	three: x: -590, y: 190, scale: 0.85, originX: 1, originY: 0
$.card_2.states.animationOptions = curve: 'spring(200, 20, 0)'

$.card_3.states.add
	two: scale: 0.85, x: 720, y: 190, originX: 0, originY: 0, z: 1
	three: scale: 1, x: 66, y: 160, originX: 0, originY: 0, z: 2
$.card_3.states.animationOptions = curve: 'spring(200, 20, 0)'

$.card_1.draggable.enabled = true
$.card_2.draggable.enabled = true
$.card_3.draggable.enabled = true

$.card_1.draggable.vertical = false
$.card_2.draggable.vertical = false
$.card_3.draggable.vertical = false

# Add an event listener
$.card_1.on Events.DragEnd, ->
	if $.card_1.x < 15
		$.card_1.states.switch('two')
		$.card_2.states.switch('two')
		$.card_3.states.switch('two')
		activeDot.states.switch('two')
	else
		$.card_1.states.switch('default')
		$.card_2.states.switch('default')
		$.card_3.states.switch('default')

# Return cards to default if swiped right, else go to state three
$.card_2.on Events.DragEnd, ->
	if $.card_2.x > 160
		$.card_1.states.switch('default')
		$.card_2.states.switch('default')
		$.card_3.states.switch('default')
		activeDot.states.switch('default')
	else
		$.card_1.states.switch('three')
		$.card_2.states.switch('three')
		$.card_3.states.switch('three')
		activeDot.states.switch('three')

# Return card to two if swiped right
$.card_3.on Events.DragEnd, ->
	if $.card_3.x > 160
		$.card_1.states.switch('two')
		$.card_2.states.switch('two')
		$.card_3.states.switch('two')
		activeDot.states.switch('two')
	else
		$.card_1.states.switch('three')
		$.card_2.states.switch('three')
		$.card_3.states.switch('three')

activeDot = new Layer
	width: 16
	height: 16
	x: 334
	y: 600
	borderRadius: 16
	backgroundColor: '#FFFFFF'

activeDot.states.add
	two: x: 367
	three: x: 402
activeDot.states.animationOptions = curve: 'spring(400, 20, 0)'

# Wrap the content layer within a ScrollComponent
scroll = ScrollComponent.wrap($.Transactions)
scroll.scrollHorizontal = false