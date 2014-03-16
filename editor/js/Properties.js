var Properties = function ( editor ) {

	var container = new UI.Panel();

	// signals

	var signals = editor.signals;

	var selected = null;
	var values;

	editor.signals.elementSelected.add( function ( element ) {

		container.clear();

		selected = element;
		values = {};

		var elementPanel = new UI.Panel();
		container.add( elementPanel );

		elementPanel.add( new UI.Text( element.module.name ).setWidth( '90px' ).setId( 'name' ) );
		elementPanel.add( new UI.HorizontalRule() );

		var parameters = element.module.parameters;

		for ( var key in parameters ) {

			var parameter = parameters[ key ];

			if ( parameter === null ) continue;

			var parameterRow = new UI.Panel();
			parameterRow.add( new UI.Text( parameter.name ).setWidth( '90px' ) );

			( function ( key ) {

				if ( parameter instanceof FRAME.ModuleParameter.Boolean ) {

					var parameterValue = new UI.Checkbox()
						.setValue( parameter.value )
						.onChange( function () {

							parameter.value = this.getValue();
							signals.timelineElementChanged.dispatch( element );

						} );

					parameterRow.add( parameterValue );

					values[ key ] = parameterValue;

				} else if ( parameter instanceof FRAME.ModuleParameter.Integer ) {

					var parameterValue = new UI.Integer()
						.setRange( parameter.min, parameter.max )
						.setValue( parameter.value )
						.setWidth( '150px' )
						.onChange( function () {

							parameter.value = this.getValue();
							signals.timelineElementChanged.dispatch( element );

						} );

					parameterRow.add( parameterValue );

					values[ key ] = parameterValue;

				} else if ( parameter instanceof FRAME.ModuleParameter.Float ) {

					var parameterValue = new UI.Number()
						.setRange( parameter.min, parameter.max )
						.setValue( parameter.value )
						.setWidth( '150px' )
						.onChange( function () {

							parameter.value = this.getValue();
							signals.timelineElementChanged.dispatch( element );

						} );

					parameterRow.add( parameterValue );

					values[ key ] = parameterValue;

				} else if ( parameter instanceof FRAME.ModuleParameter.Vector2 ) {

					var vectorX = new UI.Number()
						.setValue( parameter.value[ 0 ] )
						.setWidth( '50px' )
						.onChange( function () {

							parameter.value[ 0 ] = this.getValue();
							signals.timelineElementChanged.dispatch( element );

						} );
				
					var vectorY = new UI.Number()
						.setValue( parameter.value[ 1 ] )
						.setWidth( '50px' )
						.onChange( function () {

							parameter[ 1 ].value = this.getValue();
							signals.timelineElementChanged.dispatch( element );

						} );
				
					parameterRow.add( vectorX );
					parameterRow.add( vectorY );

				} else if ( parameter instanceof FRAME.ModuleParameter.Vector3 ) {

					var vectorX = new UI.Number()
						.setValue( parameter.value[ 0 ] )
						.setWidth( '50px' )
						.onChange( function () {

							parameter.value[ 0 ] = this.getValue();
							signals.timelineElementChanged.dispatch( element );

						} );
				
					var vectorY = new UI.Number()
						.setValue( parameter.value[ 1 ] )
						.setWidth( '50px' )
						.onChange( function () {

							parameter.value[ 1 ] = this.getValue();
							signals.timelineElementChanged.dispatch( element );

						} );

					var vectorZ = new UI.Number()
						.setValue( parameter.value[ 2 ] )
						.setWidth( '50px' )
						.onChange( function () {

							parameter.value[ 2 ] = this.getValue();
							signals.timelineElementChanged.dispatch( element );

						} );
				
					parameterRow.add( vectorX );
					parameterRow.add( vectorY );
					parameterRow.add( vectorZ );

				} else if ( parameter instanceof FRAME.ModuleParameter.String ) {

					var parameterValue = new UI.Input()
						.setValue( parameter.value )
						.setWidth( '150px' )
						.onKeyUp( function () {

							parameter.value = this.getValue();
							signals.timelineElementChanged.dispatch( element );

						} );

					parameterRow.add( parameterValue );

				} else if ( parameter instanceof FRAME.ModuleParameter.Color ) {

					var parameterValue = new UI.Color()
						.setHexValue( parameter.value )
						.setWidth( '150px' )
						.onChange( function () {

							parameter.value = this.getHexValue();
							signals.timelineElementChanged.dispatch( element );

						} );

					parameterRow.add( parameterValue );

				}

			} )( key );

			elementPanel.add( parameterRow );

		};

	} );

	editor.signals.timeChanged.add( function () {

		if ( selected !== null ) {

			var element = selected;

			for ( var key in values ) {

				values[ key ].setValue( element.module.parameters[ key ].value );

			}

		}

	} );

	return container;

}
