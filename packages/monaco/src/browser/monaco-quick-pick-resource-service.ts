/********************************************************************************
 * Copyright (C) 2021 TypeFox and others.
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

import { inject } from '@theia/core/shared/inversify';
import { PickResourceOptions, QuickInputService, QuickPickItem, QuickPickResourceService } from '@theia/core/src/browser';
import URI from '@theia/core/src/common/uri';

export interface FileQuickPickItem extends QuickPickItem {
    uri: URI;
    isFolder: boolean;
}

export class MonacoQuickPickResourceService implements QuickPickResourceService {

    @inject(QuickInputService)
    protected readonly quickInputService: QuickInputService;

    open(options?: PickResourceOptions): Promise<URI> {
        throw new Error();
        // const allowFolderSelection = !!options?.canSelectFolders;
        // const allowFileSelection = !!options?.canSelectFiles;
        // this.separator = this.labelService.getSeparator(this.scheme, this.remoteAuthority);
        // this.hidden = false;
        // let homedir: URI = options?.defaultUri ? options.defaultUri : this.workspaceContextService.getWorkspace().folders[0].uri;
        // let stat: IFileStat | undefined;
        // let ext: string = resources.extname(homedir);
        // if (options?.defaultUri) {
        // try {
        // stat = await this.fileService.resolve(this.options.defaultUri);
        // } catch (e) {
        // // The file or folder doesn't exist
        // }
        // if (!stat || !stat.isDirectory) {
        // homedir = resources.dirname(this.options.defaultUri);
        // this.trailing = resources.basename(this.options.defaultUri);
        // }
        // }

        // return new Promise(resolve => {
        //     const pickBox = this.quickInputService.createQuickPick<FileQuickPickItem>();
        //     pickBox.matchOnLabel = false;
        //     pickBox.sortByLabel = false;
        //     pickBox.autoFocusOnList = false;
        //     pickBox.ignoreFocusOut = true;
        //     pickBox.ok = true;

        //     if (options && options.availableFileSystems) {
        //         pickBox.customButton = true;
        //         pickBox.customLabel = 'Show Local';
        //     }

        //     let isResolving: number = 0;
        //     let isAcceptHandled = false;
        //     this.currentFolder = resources.dirname(homedir);
        //     this.userEnteredPathSegment = '';
        //     this.autoCompletePathSegment = '';

        //     pickBox.title = options && options.title;
        //     pickBox.value = this.pathFromUri(this.currentFolder, true);
        //     pickBox.valueSelection = [pickBox.value.length, pickBox.value.length];
        //     pickBox.items = [];

        //     function doResolve(dialog: SimpleFileDialog, uri: URI | undefined) {
        //         if (uri) {
        //             uri = resources.addTrailingPathSeparator(uri, dialog.separator); // Ensures that c: is c:/ since this comes from user input and can be incorrect.
        //             // To be consistent, we should never have a trailing path separator on directories (or anything else). Will not remove from c:/.
        //             uri = resources.removeTrailingPathSeparator(uri);
        //         }
        //         resolve(uri);
        //         dialog.contextKey.set(false);
        //         dialog.filePickBox.dispose();
        //         dispose(dialog.disposables);
        //     }

        //     pickBox.onDidCustom(() => {
        //         if (isAcceptHandled || this.busy) {
        //             return;
        //         }

        //         isAcceptHandled = true;
        //         isResolving++;
        //         if (this.options.availableFileSystems && (this.options.availableFileSystems.length > 1)) {
        //             this.options.availableFileSystems = this.options.availableFileSystems.slice(1);
        //         }
        //         pickBox.hide();
        //         if (isSave) {
        //             return this.fileDialogService.showSaveDialog(this.options).then(result => {
        //                 doResolve(this, result);
        //             });
        //         } else {
        //             return this.fileDialogService.showOpenDialog(this.options).then(result => {
        //                 doResolve(this, result ? result[0] : undefined);
        //             });
        //         }
        //     });

        //     function handleAccept(dialog: SimpleFileDialog) {
        //         if (dialog.busy) {
        //             // Save the accept until the file picker is not busy.
        //             dialog.onBusyChangeEmitter.event((busy: boolean) => {
        //                 if (!busy) {
        //                     handleAccept(dialog);
        //                 }
        //             });
        //             return;
        //         } else if (isAcceptHandled) {
        //             return;
        //         }

        //         isAcceptHandled = true;
        //         isResolving++;
        //         dialog.onDidAccept().then(resolveValue => {
        //             if (resolveValue) {
        //                 dialog.filePickBox.hide();
        //                 doResolve(dialog, resolveValue);
        //             } else if (dialog.hidden) {
        //                 doResolve(dialog, undefined);
        //             } else {
        //                 isResolving--;
        //                 isAcceptHandled = false;
        //             }
        //         });
        //     }

        //     pickBox.onDidAccept(_ => {
        //         handleAccept(this);
        //     });

        //     pickBox.onDidChangeActive(i => {
        //         isAcceptHandled = false;
        //         // update input box to match the first selected item
        //         if ((i.length === 1) && this.isSelectionChangeFromUser()) {
        //             pickBox.validationMessage = undefined;
        //             const userPath = this.constructFullUserPath();
        //             if (!equalsIgnoreCase(pickBox.value.substring(0, userPath.length), userPath)) {
        //                 pickBox.valueSelection = [0, pickBox.value.length];
        //                 this.insertText(userPath, userPath);
        //             }
        //             this.setAutoComplete(userPath, this.userEnteredPathSegment, i[0], true);
        //         }
        //     });

        //     pickBox.onDidChangeValue(async value => {
        //         return this.handleValueChange(value);
        //     });
        //     pickBox.onDidHide(() => {
        //         this.hidden = true;
        //         if (isResolving === 0) {
        //             doResolve(this, undefined);
        //         }
        //     });

        //     pickBox.show();
        //     this.contextKey.set(true);
        //     await this.updateItems(homedir, true, this.trailing);
        //     if (this.trailing) {
        //         pickBox.valueSelection = [pickBox.value.length - this.trailing.length, pickBox.value.length - ext.length];
        //     } else {
        //         pickBox.valueSelection = [pickBox.value.length, pickBox.value.length];
        //     }
        // });
    }
}
