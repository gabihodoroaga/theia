/********************************************************************************
 * Copyright (C) 2021 Ericsson and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import URI from '@theia/core/lib/common/uri';
import * as React from '@theia/core/shared/react';
import { DebugConfiguration } from '../../common/debug-common';
import { DebugConfigurationManager } from '../debug-configuration-manager';
import { DebugSessionOptions, InternalDebugSessionOptions } from '../debug-session-options';

export interface DebugConfigurationSelectProps {
    manager: DebugConfigurationManager,
    isMultiRoot: boolean
}

export interface DebugConfigurationSelectState {
    configsPerType: { type: string, configurations: DebugConfiguration[] }[]
}

export class DebugConfigurationSelect extends React.Component<DebugConfigurationSelectProps, DebugConfigurationSelectState> {

    protected static readonly SEPARATOR = '──────────';

    constructor(props: DebugConfigurationSelectProps) {
        super(props);
        this.state = {
            configsPerType: [],
        };
    }

    componentDidMount(): void {
        this.refreshDebugConfigurations();
    }

    render(): React.ReactNode {
        return <select
            className='theia-select debug-configuration'
            value={this.currentValue}
            onChange={this.setCurrentConfiguration}
            onFocus={this.refreshDebugConfigurations}
            onBlur={this.refreshDebugConfigurations}
        >
            {this.renderOptions()}
        </select>;
    }

    protected get currentValue(): string {
        const { current } = this.props.manager;
        return current ? InternalDebugSessionOptions.toValue(current) : '__NO_CONF__';
    }

    protected readonly setCurrentConfiguration = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value;
        if (value === '__ADD_CONF__') {
            this.props.manager.addConfiguration();
        } else {
            const [name, workspaceFolderUri, type] = InternalDebugSessionOptions.parseValue(value);
            this.props.manager.current = this.props.manager.find(name, workspaceFolderUri, type);
        }
    };

    protected refreshDebugConfigurations = async () => {
        const configsPerType = await this.props.manager.provideDynamicDebugConfigurations();
        this.setState({ configsPerType });
    };

    protected renderOptions(): React.ReactNode {
        // Add stored configurations
        const storedConfigs = Array.from(this.props.manager.all);

        let index = 0;

        const options: React.ReactNode[] = storedConfigs.map(config =>
            <option key={index++} value={InternalDebugSessionOptions.toValue(config)}>
                {this.toName(config, this.props.isMultiRoot)}
            </option>
        );

        // Add Dynamic configurations
        for (const { type, configurations } of this.state.configsPerType) {
            if (configurations && configurations.length > 0) {
                options.push(
                    <option key={index++} disabled>{`${DebugConfigurationSelect.SEPARATOR} ${type} (provided)`}</option>
                );
                for (const configuration of configurations) {
                    options.push(
                        <option key={index++} value={InternalDebugSessionOptions.toValue({ configuration })}>{configuration.name}</option>
                    );
                }
            }
        }

        // If No configurations
        if (options.length === 0) {
            options.push(<option key={index++} value='__NO_CONF__'>No Configurations</option>);
        }

        // Add the option to open the configurations file to manually add a configuration
        options.push(<option key={index++} disabled>{DebugConfigurationSelect.SEPARATOR}</option>);
        options.push(<option key={index++} value='__ADD_CONF__'>Add Configuration...</option>);

        return options;
    };

    protected toName({ configuration, workspaceFolderUri }: DebugSessionOptions, multiRoot: boolean): string {
        if (!workspaceFolderUri || !multiRoot) {
            return configuration.name;
        }
        return configuration.name + ' (' + new URI(workspaceFolderUri).path.base + ')';
    }
}
